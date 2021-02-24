const { config: testUtilsConfig } = require('@vue/test-utils');

const { matcherHint, printReceived, printExpected } = require('jest-matcher-utils');
const get = require('lodash/get');
const isString = require('lodash/isString');
const setConfigs = require('../config').default;

setConfigs();

expect.extend({
  toHaveLoggedVueErrors(consoleSpy) {
    const calls = get(consoleSpy, 'error.mock.calls', []);
    const loggedVueErrors = calls.some(([call]) => isString(call) && call.startsWith('[Vue warn]'));
    return {
      pass: loggedVueErrors,
      message: () =>
        loggedVueErrors
          ? 'Vue errors were logged to the console'
          : 'No Vue errors were logged to the console',
    };
  },
});

testUtilsConfig.deprecationWarningHandler = (method, message) => {
  const ALLOWED_DEPRECATED_METHODS = [
    // https://gitlab.com/gitlab-org/gitlab/-/issues/295679
    'finding components with `find` or `get`',

    // https://gitlab.com/gitlab-org/gitlab/-/issues/295680
    'finding components with `findAll`',
  ];
  if (!ALLOWED_DEPRECATED_METHODS.includes(method)) {
    throw new Error(message);
  }
};

// Adopted from https://github.com/testing-library/jest-dom/blob/main/src/to-have-focus.js
expect.extend({
  toHaveFocus(element) {
    return {
      pass: element.ownerDocument.activeElement === element,
      message: () => {
        return [
          matcherHint(`${this.isNot ? '.not' : ''}.toHaveFocus`, 'element', ''),
          '',
          'Expected',
          `  ${printExpected(element)}`,
          'Received:',
          `  ${printReceived(element.ownerDocument.activeElement)}`,
        ].join('\n');
      },
    };
  },
});

if (!process.env.IS_VISUAL_TEST) {
  beforeEach(() => {
    if (jest.isMockFunction(global.console.error)) {
      global.console.error.mockReset();
    }
    jest.spyOn(global.console, 'error');
  });

  afterEach(() => {
    // eslint-disable-next-line jest/no-standalone-expect
    expect(global.console).not.toHaveLoggedVueErrors();
  });
}
