import { shallowMount } from '@vue/test-utils';
import SearchBoxByType from './search_box_by_type.vue';
import LoadingIcon from '../loading_icon/loading_icon.vue';
import ClearIcon from '~/components/shared_components/clear_icon_button/clear_icon_button.vue';

describe('search box by type component', () => {
  let wrapper;

  const createComponent = propsData => {
    wrapper = shallowMount(SearchBoxByType, { propsData });
  };

  const findClearIcon = () => wrapper.find(ClearIcon);

  beforeEach(() => {
    createComponent({ value: 'somevalue' });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  describe('clear icon component', () => {
    it('is not rendered when value is empty', () => {
      createComponent({ value: '' });
      expect(findClearIcon().exists()).toBe(false);
    });

    it('is rendered when value is provided', () => {
      expect(findClearIcon().exists()).toBe(true);
    });

    it('emits empty value when clicked', () => {
      findClearIcon().vm.$emit('click');

      expect(wrapper.emitted().input).toEqual([['']]);
    });
  });

  describe('v-model', () => {
    it('syncs localValue to value prop', () => {
      wrapper.setProps({ value: 'new value' });

      expect(wrapper.vm.localValue).toEqual('new value');
    });

    it('emits input event when localValue changes', () => {
      wrapper.vm.localValue = 'new value';

      expect(wrapper.emitted().input).toEqual([['new value']]);
    });
  });

  it('renders loading icon when `isLoading` prop is provided', () => {
    createComponent({ isLoading: true });
    expect(wrapper.find(LoadingIcon).exists()).toBe(true);
  });
});
