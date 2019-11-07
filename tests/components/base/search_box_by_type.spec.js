import { shallowMount } from '@vue/test-utils';
import SearchBoxByType from '../../../src/components/base/search_box_by_type/search_box_by_type.vue';
import LoadingIcon from '../../../src/components/base/loading_icon/loading_icon.vue';
import Icon from '../../../src/components/base/icon/icon.vue';

describe('search box by type component', () => {
  let wrapper;

  const createComponent = propsData => {
    wrapper = shallowMount(SearchBoxByType, { sync: false, propsData });
  };

  const findClearIcon = () => {
    const result = wrapper.findAll(Icon).filter(c => c.props('name') === 'clear');
    if (result.length > 1) {
      throw new Error('Multiple clear icons found');
    }
    return result.length === 1 ? result.at(0) : result;
  };

  afterEach(() => {
    wrapper.destroy();
  });

  describe('clear button', () => {
    it('is not rendered when value is empty', () => {
      createComponent({ value: '' });
      expect(findClearIcon().exists()).toBe(false);
    });

    it('is rendered when value is provided', () => {
      createComponent({ value: 'somevalue' });
      expect(findClearIcon().exists()).toBe(true);
    });

    it('emits empty value when clicked', () => {
      createComponent({ value: 'somevalue' });
      wrapper.find('button[name="clear"]').trigger('click');
      expect(wrapper.emitted().update).toEqual([['']]);
    });
  });

  it('renders loading icon when `isLoading` prop is provided', () => {
    createComponent({ isLoading: true });
    expect(wrapper.find(LoadingIcon).exists()).toBe(true);
  });
});
