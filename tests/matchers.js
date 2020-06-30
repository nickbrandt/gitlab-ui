import { matcherHint, printReceived, printExpected } from 'jest-matcher-utils';

const get = require('lodash/get');
const isString = require('lodash/isString');

export function toHaveLoggedVueErrors(consoleSpy) {
  const calls = get(consoleSpy, 'error.mock.calls', []);
  const loggedVueErrors = calls.some(([call]) => isString(call) && call.startsWith('[Vue warn]'));
  return {
    pass: loggedVueErrors,
    message: () =>
      loggedVueErrors
        ? 'Vue errors were logged to the console'
        : 'No Vue errors were logged to the console',
  };
}

// Adopted from https://github.com/testing-library/jest-dom/blob/master/src/to-have-focus.js
export function toHaveFocus(element) {
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
}
