import { shallowMount } from '@vue/test-utils';
import GlNavItem from '../../../src/components/base/nav/nav_item.vue';

describe('GlNavItem', () => {
  let wrapper;

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders the text', () => {
    wrapper = shallowMount(GlNavItem, {
      slots: {
        default: 'Hello, World!',
      },
    });

    expect(wrapper.find(GlNavItem).text()).toBe('Hello, World!');
  });
});
