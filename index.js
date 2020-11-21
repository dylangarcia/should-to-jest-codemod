const matchers = require('./matchers');

const asJSON = (node) => JSON.parse(JSON.stringify(node));

const cleanNode = (node, keys = ['start', 'end', 'loc']) => {
  if (Array.isArray(node)) {
    return node.map((_node) => cleanNode(_node));
  }

  if (!node || typeof node !== 'object') {
    return node;
  }

  return Object.fromEntries(
    Object.entries(node)
      .filter(([key]) => !keys.includes(key))
      .map(([key, value]) => {
        return [key, cleanNode(value, keys)];
      }),
  );
};

const getArguments = (node) => {
  let root = node;
  let args;

  while (!args && root) {
    args = root.arguments;
    if (!args) {
      root = root.object;
    }
  }

  if (root) {
    root.arguments = [];
  }

  function undo() {
    if (root) {
      root.arguments = args;
    }
  }

  return [args, undo];
};

module.exports = function transform(file, api) {
  const j = api.jscodeshift;

  const is = (a, b) => {
    const aSource = j(a).toSource();
    const bSource = j(b).toSource();

    return aSource === bSource || `${aSource};` === bSource;
  };

  const isPrototypeShould = (node, replacer = j.identifier('actual')) => {
    let root = node;

    while (root) {
      if (root.property && root.property.name === 'should') {
        const ret = root.object;
        root.object = replacer;
        return ret;
      }
      root = root.object;
    }

    return null;
  };

  const parseRawLine = (line) =>
    cleanNode(asJSON(j(line).find(j.ExpressionStatement).nodes()[0]));

  const root = j(file.source);

  root.find(j.ExpressionStatement).forEach((expressionNode) => {
    let [actual, undo] = getArguments(expressionNode.value.expression.callee);
    let [expected, expectedUndo] = getArguments(
      expressionNode.value.expression,
    );
    const maybePrototypeCallee = isPrototypeShould(
      expressionNode.value.expression.callee,
    );

    const comments = expressionNode.value.comments;
    expressionNode.value.comments = [];

    let didMatchAny = false;

    Object.keys(matchers).forEach((matcher) => {
      const line = parseRawLine(matcher);

      if (!expressionNode.value || !expressionNode.value.expression) {
        return;
      }

      if (maybePrototypeCallee) {
        actual = maybePrototypeCallee;
      }

      actual = actual || [];
      expected = expected || [];

      if (is(expressionNode, line)) {
        actual = j(actual).toSource();
        expected = j(expected).toSource();
        j(expressionNode).replaceWith(
          j(matchers[matcher](actual, expected) + ';').nodes()[0].program
            .body[0],
        );

        if (comments) {
          expressionNode.value.comments = comments;
        }

        didMatchAny = true;
      } else {
        if (maybePrototypeCallee) {
          // reinstate the bar in "foo(bar)[0].should.match(/baz/)"
          maybePrototypeCallee.object = maybePrototypeCallee;
          if (!didMatchAny) undo();
        }
      }
    });

    if (!didMatchAny) {
      undo();
      expectedUndo();
    }
  });

  root.find(j.CallExpression).forEach((callExpression) => {
    if (
      !callExpression.value ||
      !callExpression.value.callee.object ||
      !callExpression.value.callee.object.callee ||
      callExpression.value.callee.object.callee.name !== 'should'
    ) {
      return;
    }
    let [actual, undo] = getArguments(callExpression.value.callee);
    let [expected, expectedUndo] = getArguments(callExpression.value);
    const maybePrototypeCallee = isPrototypeShould(callExpression);

    let didMatchAny = false;

    Object.keys(matchers).forEach((matcher) => {
      const line = parseRawLine(matcher);

      if (maybePrototypeCallee) {
        actual = maybePrototypeCallee;
      }

      actual = actual || [];
      expected = expected || [];

      if (is(callExpression, line)) {
        actual = j(actual).toSource();
        expected = j(expected).toSource();
        j(callExpression).replaceWith(
          j(matchers[matcher](actual, expected)).nodes()[0].program.body[0],
        );
        didMatchAny = true;
      } else {
        if (maybePrototypeCallee) {
          // reinstate the bar in "foo(bar)[0].should.match(/baz/)"
          maybePrototypeCallee.object = maybePrototypeCallee;
          if (!didMatchAny) undo();
        }
      }
    });

    if (!didMatchAny) {
      undo();
      expectedUndo();
    }
  });

  return root.toSource();
};
