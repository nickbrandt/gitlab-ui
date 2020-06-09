import { mount } from '@vue/test-utils';
import GlLoadingIcon from '../loading_icon/loading_icon.vue';
import GlButton from './button.vue';

describe('button component', () => {
  let wrapper;

  const buildWrapper = (propsData = {}) => {
    wrapper = mount(GlButton, {
      propsData,
    });
  };

  afterEach(() => {
    wrapper.destroy();
    wrapper = null;
  });

  it('removes btn class selector', () => {
    buildWrapper();

    expect(wrapper.classes()).not.toContain('btn');
  });

  describe('ellipsis button', () => {
    it('should add `button-ellipsis-horizontal` class', () => {
      buildWrapper({ icon: 'ellipsis_h' });

      expect(wrapper.classes()).toContain('button-ellipsis-horizontal');
    });
  });

  describe('label button', () => {
    it('should add `btn-label` class', () => {
      buildWrapper({ label: true });

      expect(wrapper.classes()).toContain('btn-label');
    });
  });

  describe('loading indicator', () => {
    const findLoadingIcon = () => wrapper.find(GlLoadingIcon);

    beforeEach(() => {
      buildWrapper({
        loading: true,
      });
    });

    it('should render the loading indicator', () => {
      expect(findLoadingIcon().exists()).toBe(true);
    });

    it('should render the loading indicator with the `gl-button-loading-indicator` class', () => {
      expect(findLoadingIcon().classes()).toContain('gl-button-loading-indicator');
    });
  });
});
