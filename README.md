# should-to-jest-codemod

This is a jscodeshift codemod that helps transforms legacy `should` tests to Jest's `expect` format.

### Supported should methods

The latest supported methods are always located in [\_\_testfixtures\_\_/should-to-jest.input.js](https://github.com/dylangarcia/should-to-jest-codemod/blob/main/__testfixtures__/should-to-jest.input.js). The transformed output is located in [\_\_testfixtures\_\_/should-to-jest.output.js](https://github.com/dylangarcia/should-to-jest-codemod/blob/main/__testfixtures__/should-to-jest.output.js)

### Usage

```js
yarn jscodeshift \
  -t index.js \
  file-to-transform.js
  --parser flow
```
