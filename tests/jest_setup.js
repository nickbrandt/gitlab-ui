import * as customMatchers from './matchers';

const setConfigs = require('../config').default;

setConfigs();

expect.extend(customMatchers);

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
