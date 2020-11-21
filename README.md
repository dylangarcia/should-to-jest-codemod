# should-to-jest-codemod

This is a jscodeshift codemod that helps transforms legacy `should` tests to Jest's `expect` format.

### Usage

```js
yarn jscodeshift \
  -t index.js \
  file-to-transform.js
  --parser flow
```

### Examples

#### Input

```js
should(something.nested).match(/foo/i);
should.exist(foo);
should.not.exist(foo);
foo(bar)[0].should.match(/bar/);
err.problems[0].should.match(/oopsies/i);
```

#### Output

```js
expect(something.nested).toMatch(/foo/i);
expect(foo).toBeDefined();
expect(foo).not.toBe(expect.anything());
expect(foo(bar)[0]).toMatch(/bar/);
expect(err.problems[0]).toMatch(/oopsies/i);
```

### Supported should methods

The latest supported methods are always located in [\_\_testfixtures\_\_/should-to-jest.input.js](https://github.com/dylangarcia/should-to-jest-codemod/blob/main/__testfixtures__/should-to-jest.input.js). The transformed output is located in [\_\_testfixtures\_\_/should-to-jest.output.js](https://github.com/dylangarcia/should-to-jest-codemod/blob/main/__testfixtures__/should-to-jest.output.js)
