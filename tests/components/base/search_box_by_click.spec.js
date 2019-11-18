import { shallowMount } from '@vue/test-utils';
import SearchBoxByClick from '../../../src/components/base/search_box_by_click/search_box_by_click.vue';

describe('search box by click component', () => {
  let wrapper;

  const createComponent = propsData => {
    wrapper = shallowMount(SearchBoxByClick, { sync: false, propsData });
  };

  afterEach(() => {
    wrapper.destroy();
  });

  describe('clear button', () => {
    it('emits empty value when clicked', () => {
      createComponent({ value: 'somevalue' });

      const clear = wrapper.find({ ref: 'clearInput' });
      clear.trigger('click');

      expect(wrapper.emitted().input).toEqual([['']]);
    });
  });

  describe('v-model', () => {
    beforeEach(() => {
      createComponent({ value: 'somevalue' });
    });

    it('syncs localValue to value prop', () => {
      wrapper.setProps({ value: 'new value' });

      expect(wrapper.vm.localValue).toEqual('new value');
    });

    it('emits input event when localValue changes', () => {
      wrapper.vm.localValue = 'new value';

      expect(wrapper.emitted().input).toEqual([['new value']]);
    });
  });
});
