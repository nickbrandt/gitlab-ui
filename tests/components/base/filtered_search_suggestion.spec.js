import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import FilteredSearchSuggestion from '../../../src/components/base/filtered_search/filtered_search_suggestion.vue';
import GlDropdownItem from '../../../src/components/base/new_dropdown/new_dropdown_item.vue';

describe('Filtered search suggestion component', () => {
  let wrapper;
  let listMock;

  const createComponent = value => {
    wrapper = shallowMount(FilteredSearchSuggestion, {
      sync: false,
      propsData: { value },
      provide: {
        filteredSearchSuggestionListInstance: listMock,
      },
    });
  };

  beforeEach(() => {
    listMock = Vue.observable({
      register: jest.fn(),
      unregister: jest.fn(),
      $emit: jest.fn(),
      activeItem: null,
    });
  });

  afterEach(() => {
    wrapper.destroy();
    wrapper = null;
  });

  it('registers in list instance when mounted', () => {
    createComponent();
    expect(listMock.register).toHaveBeenCalledWith(wrapper.vm);
  });

  it('unregisters in list instance when unmounted', () => {
    createComponent();
    wrapper.destroy();
    expect(listMock.unregister).toHaveBeenCalledWith(wrapper.vm);
  });

  it('emits suggestion event on list instance when clicked', () => {
    const value = 'demo';
    createComponent(value);
    wrapper.find(GlDropdownItem).vm.$emit('click');
    expect(listMock.$emit).toHaveBeenCalledWith('suggestion', value);
  });

  it('adds active class to dropdown when active in list', () => {
    createComponent();
    listMock.activeItem = wrapper.vm;
    return wrapper.vm.$nextTick(() => {
      expect(wrapper.find(GlDropdownItem).classes()).toContain(
        'gl-filtered-search-suggestion-active'
      );
    });
  });
});
