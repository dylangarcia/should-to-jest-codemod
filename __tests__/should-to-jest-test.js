jest.autoMockOff();

const defineTest = require('jscodeshift/dist/testUtils').defineTest;
defineTest(__dirname, 'index', null, 'should-to-jest');
