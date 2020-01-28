import { shallowMount } from '@vue/test-utils';
import GlFilteredSearchStaticBinaryToken from '../../../src/components/base/filtered_search/filtered_search_static_binary_token.vue';
import GlFilteredSearchBinaryToken from '../../../src/components/base/filtered_search/filtered_search_binary_token.vue';

describe('Filtered search static binary token component', () => {
  let wrapper;

  const defaultProps = {
    title: 'testTitle',
    items: [
      { icon: 'test1', title: 'first', value: 'one' },
      { title: 'second', value: 'two' },
    ],
    value: '',
  };

  const createComponent = props => {
    wrapper = shallowMount(GlFilteredSearchStaticBinaryToken, {
      propsData: { ...defaultProps, ...props },
    });
  };

  afterEach(() => {
    wrapper.destroy();
    wrapper = null;
  });

  it('renders binary token', () => {
    createComponent({ value: 'test-value' });

    expect(wrapper.attributes()).toEqual({
      title: 'Confidential',
      value: 'test-value',
    });
  });

  it('correctly maps existing value to one of items', () => {
    createComponent({ value: '' });
    wrapper.find(GlFilteredSearchBinaryToken).vm.$emit('input', 'first');
    return wrapper.vm.$nextTick().then(() => {
      expect(wrapper.emitted().input.length).toBe(1);
      expect(wrapper.emitted().input[0]).toStrictEqual(['one']);
    });
  });

  it('emits unchanged value when mapping not exists', () => {
    createComponent({ value: '' });
    wrapper.find(GlFilteredSearchBinaryToken).vm.$emit('input', 'other-value');
    return wrapper.vm.$nextTick().then(() => {
      expect(wrapper.emitted().input.length).toBe(1);
      expect(wrapper.emitted().input[0]).toStrictEqual(['other-value']);
    });
  });

  it('passes mapped value to underlyiung binary token when mapping exists', () => {
    createComponent({ value: 'one' });
    expect(wrapper.find(GlFilteredSearchBinaryToken).props('value')).toBe('first');
  });
});
