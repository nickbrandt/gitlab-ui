import { mount } from '@vue/test-utils';
import GlNavbar from '../../../src/components/base/navbar/navbar.vue';

describe('Navbar Component', () => {
  const propsData = {
    variant: 'dark',
  };
  let wrapper;

  describe('Dark Navbar', () => {
    beforeEach(() => {
      wrapper = mount(GlNavbar, {
        propsData: { ...propsData, type: 'dark' },
      });
    });

    it('should add the `navbar-dark` class', () => {
      expect(wrapper.contains('.navbar-dark')).toBe(true);
    });
  });
});
