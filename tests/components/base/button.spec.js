import { mount } from '@vue/test-utils';
import GlLoadingIcon from '../../../src/components/base/loading_icon/loading_icon.vue';
import NewButton from '../../../src/components/base/button/button.vue';

describe('button component', () => {
  const mountWithOptions = mount.bind(null, NewButton);

  describe('ellipsis button', () => {
    let button;

    beforeEach(() => {
      button = mountWithOptions({
        propsData: {
          icon: 'ellipsis_h',
        },
      });
    });

    it('should add `button-ellipsis-horizontal` class', () => {
      expect(button.classes()).toContain('button-ellipsis-horizontal');
    });
  });

  describe('label button', () => {
    let button;

    beforeEach(() => {
      button = mountWithOptions({
        propsData: {
          label: true,
        },
      });
    });

    it('should add `btn-label` class', () => {
      expect(button.classes()).toContain('btn-label');
    });
  });

  describe('loading indicator', () => {
    let button;
    const findLoadingIcon = () => button.find(GlLoadingIcon);

    beforeEach(() => {
      button = mountWithOptions({
        propsData: {
          loading: true,
        },
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
