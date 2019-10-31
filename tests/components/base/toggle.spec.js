import { shallowMount } from '@vue/test-utils';
import Toggle from '../../../src/components/base/toggle/toggle.vue';

describe('toggle', () => {
  let wrapper;

  const createWrapper = (props = {}) => {
    wrapper = shallowMount(Toggle, {
      propsData: {
        ...props,
      },
    });
  };

  beforeEach(() => {
    jest.spyOn(global.console, 'error');
    createWrapper();
  });

  afterEach(() => {
    wrapper.destroy();
    wrapper = null;
  });

  it('renders without errors', () => {
    expect(wrapper.isVueInstance()).toBe(true);
    expect(global.console.error).not.toHaveBeenCalled();
  });
});
