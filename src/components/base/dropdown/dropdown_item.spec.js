import { shallowMount } from '@vue/test-utils';
import { BDropdownItem, BDropdownItemButton } from 'bootstrap-vue';

import GlDropdownItem from './dropdown_item.vue';

describe('dropdown item', () => {
  let wrapper;

  const buildWrapper = propsData => {
    wrapper = shallowMount(GlDropdownItem, {
      propsData,
    });
  };

  afterEach(() => wrapper.destroy());

  describe('dynamic component rendering', () => {
    it('with no "href" or "to" attrs, renders a button', () => {
      buildWrapper();
      expect(wrapper.find(BDropdownItemButton).exists()).toBe(true);
    });

    it('with "href" attr, renders an item', () => {
      buildWrapper({ href: '/home' });
      expect(wrapper.find(BDropdownItem).exists()).toBe(true);
    });

    it('with "to" attr, renders an item', () => {
      buildWrapper({ to: { path: 'home' } });
      expect(wrapper.find(BDropdownItem).exists()).toBe(true);
    });
  });
});
