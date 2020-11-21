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

  const is = (a, b) => j(a).toSource() === j(b).toSource();

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

  const expressions = j(file.source).find(j.ExpressionStatement);

  return expressions
    .forEach((expressionNode) => {
      let [actual, undo] = getArguments(expressionNode.value.expression.callee);
      let [expected, expectedUndo] = getArguments(
        expressionNode.value.expression,
      );
      const maybePrototypeCallee = isPrototypeShould(
        expressionNode.value.expression.callee,
      );

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
          j(expressionNode).replaceWith(matchers[matcher](actual, expected));
          didMatchAny = true;
        } else {
          if (maybePrototypeCallee) {
            // reinstate the bar in "foo(bar)[0].should.match(/baz/)"
            maybePrototypeCallee.object = maybePrototypeCallee;
          }
          undo();
        }
      });

      if (!didMatchAny) {
        expectedUndo();
      }
    })
    .toSource();
};