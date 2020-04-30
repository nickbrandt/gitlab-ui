const get = require('lodash/get');
const isString = require('lodash/isString');

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
