import { shallowMount } from '@vue/test-utils';
import { BInputGroup } from 'bootstrap-vue';
import SearchBoxByClick from '../../../src/components/base/search_box_by_click/search_box_by_click.vue';
import GlDropdownItem from '../../../src/components/base/new_dropdown/new_dropdown_item.vue';
import GlFormInput from '../../../src/components/base/form/form_input/form_input.vue';

describe('search box by click component', () => {
  let wrapper;

  const createComponent = propsData => {
    wrapper = shallowMount(SearchBoxByClick, {
      propsData,
      stubs: { BInputGroup },
    });
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it('emits input event when input changes', async () => {
    createComponent({ value: 'somevalue' });

    wrapper.find({ ref: 'input' }).vm.$emit('input', 'new value');

    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().input).toEqual([['new value']]);
  });

  it('does not displays history dropdown by default', () => {
    createComponent();
    expect(wrapper.find({ ref: 'historyDropdown' }).exists()).toBe(false);
  });

  describe('when historyItems prop is provided', () => {
    beforeEach(() => {
      createComponent({ historyItems: ['one', 'two', 'three'] });
    });

    it('displays history dropdown', () => {
      expect(wrapper.find({ ref: 'historyDropdown' }).exists()).toBe(true);
    });

    it('hides dropdown when close buton is clicked', () => {
      wrapper.vm.$refs.historyDropdown.hide = jest.fn();

      wrapper.find({ ref: 'closeHistory' }).vm.$emit('click');

      expect(wrapper.vm.$refs.historyDropdown.hide).toHaveBeenCalled();
    });

    it('emits clear-history event when clear button is clicked', () => {
      wrapper.find({ ref: 'clearHistory' }).vm.$emit('click');

      expect(wrapper.emitted()['clear-history'].length).toBe(1);
    });

    it('emits proper events when history item is clicked', async () => {
      wrapper.find(GlDropdownItem).vm.$emit('click');

      await wrapper.vm.$nextTick();
      expect(wrapper.emitted().input[0]).toEqual(['one']);
      expect(wrapper.emitted().submit[0]).toEqual(['one']);
    });
  });

  it('emits submit event when Enter key is pressed', async () => {
    createComponent({ value: 'some-input' });

    wrapper.find(GlFormInput).vm.$emit('keydown', { type: 'key', keyCode: 13 });

    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().submit[0]).toEqual(['some-input']);
  });

  it('emits submit event when search button is pressed', async () => {
    createComponent({ value: 'some-input' });

    wrapper.find({ ref: 'searchButton' }).vm.$emit('click');

    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().submit[0]).toEqual(['some-input']);
  });
});
