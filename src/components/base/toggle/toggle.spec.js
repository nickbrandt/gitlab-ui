import { shallowMount } from '@vue/test-utils';
import Toggle from './toggle.vue';

describe('toggle', () => {
  let wrapper;

  const createWrapper = (props = {}) => {
    wrapper = shallowMount(Toggle, {
      propsData: {
        ...props,
      },
    });
  };

  const findButton = () => wrapper.find('button');
  const findToggleIcon = () => wrapper.find('.toggle-icon');

  beforeEach(() => {
    createWrapper();
  });

  afterEach(() => {
    wrapper.destroy();
    wrapper = null;
  });

  it.each`
    description      | finder
    ${'button'}      | ${findButton}
    ${'toggle icon'} | ${findToggleIcon}
  `('calls toggleFeature once when clicking on the $description', ({ finder }) => {
    jest.spyOn(wrapper.vm, 'toggleFeature');
    finder().trigger('click');

    expect(wrapper.vm.toggleFeature).toHaveBeenCalledTimes(1);
  });
});
