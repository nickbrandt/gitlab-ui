import { shallowMount } from '@vue/test-utils';
import GlNav from '../../../src/components/base/nav/nav.vue';
import GlNavItem from '../../../src/components/base/nav/nav_item.vue';

describe('GlNav', () => {
  let wrapper;

  afterEach(() => {
    wrapper.destroy();
  });

  describe('Nav style', () => {
    it('renders slot content', () => {
      wrapper = shallowMount(GlNav, {
        slots: {
          default: [GlNavItem, GlNavItem],
        },
      });

      expect(wrapper.findAll(GlNavItem).exists()).toBeTruthy();
    });
  });
});
