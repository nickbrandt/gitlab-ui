import { shallowMount, mount } from '@vue/test-utils';
import FilteredSearchSuggestionList from './filtered_search_suggestion_list.vue';
import FilteredSearchSuggestion from './filtered_search_suggestion.vue';

describe('Filtered search suggestion list component', () => {
  let wrapper;

  describe('suggestions API', () => {
    beforeEach(() => {
      wrapper = shallowMount(FilteredSearchSuggestionList, {
        provide: { suggestionsListClass: () => 'custom-class' },
      });
    });

    afterEach(() => {
      wrapper.destroy();
      wrapper = null;
    });

    it('has expected public methods', () => {
      expect(wrapper.vm.register).toBeInstanceOf(Function);
      expect(wrapper.vm.unregister).toBeInstanceOf(Function);
      expect(wrapper.vm.getValue).toBeInstanceOf(Function);
      expect(wrapper.vm.nextItem).toBeInstanceOf(Function);
      expect(wrapper.vm.prevItem).toBeInstanceOf(Function);
    });

    describe('navigation', () => {
      const stubs = [{ value: 'stub1' }, { value: 'stub2' }, { value: 'stub3' }];
      beforeEach(() => {
        stubs.forEach((s) => {
          wrapper.vm.register(s);
        });
      });

      it('does not select item by default', () => {
        expect(wrapper.vm.getValue()).toBe(null);
      });

      it('selects first item on nextItem call', () => {
        wrapper.vm.nextItem();
        return wrapper.vm.$nextTick().then(() => {
          expect(wrapper.vm.getValue()).toBe(stubs[0].value);
        });
      });

      it('deselects first item on prevItem call', () => {
        wrapper.vm.nextItem();
        wrapper.vm.prevItem();
        return wrapper.vm.$nextTick().then(() => {
          expect(wrapper.vm.getValue()).toBe(null);
        });
      });

      it('deselects last item on nextItem call', () => {
        stubs.forEach(() => wrapper.vm.nextItem());
        wrapper.vm.nextItem();
        return wrapper.vm.$nextTick().then(() => {
          expect(wrapper.vm.getValue()).toBe(null);
        });
      });

      it('remove selection if suggestion is unregistered', () => {
        wrapper.vm.nextItem();
        return wrapper.vm
          .$nextTick()
          .then(() => {
            wrapper.vm.unregister(stubs[0]);
            return wrapper.vm.$nextTick();
          })
          .then(() => {
            expect(wrapper.vm.getValue()).toBe(null);
          });
      });
    });
  });

  describe('integration tests', () => {
    const list = {
      components: {
        GlFilteredSearchSuggestion: FilteredSearchSuggestion,
      },
      template: `
        <div>
          <gl-filtered-search-suggestion value="1">1</gl-filtered-search-suggestion>
          <gl-filtered-search-suggestion value="2">2</gl-filtered-search-suggestion>
        </div>
      `,
    };

    beforeAll(() => {
      if (!HTMLElement.prototype.scrollIntoView) {
        HTMLElement.prototype.scrollIntoView = jest.fn();
      }
    });

    afterAll(() => {
      if (HTMLElement.prototype.scrollIntoView.mock) {
        delete HTMLElement.prototype.scrollIntoView;
      }
    });

    beforeEach(() => {
      wrapper = mount(FilteredSearchSuggestionList, {
        provide: { suggestionsListClass: () => 'custom-class' },
        slots: {
          default: list,
        },
      });
    });

    it('selects first suggestion', () => {
      wrapper.vm.nextItem();
      return wrapper.vm.$nextTick().then(() => {
        expect(wrapper.vm.getValue()).toBe('1');
      });
    });

    it('selects second suggestion', () => {
      wrapper.vm.nextItem();
      wrapper.vm.nextItem();
      return wrapper.vm.$nextTick().then(() => {
        expect(wrapper.vm.getValue()).toBe('2');
      });
    });

    it('deselects first suggestion after list end', () => {
      wrapper.vm.nextItem();
      wrapper.vm.nextItem();
      wrapper.vm.nextItem();
      return wrapper.vm.$nextTick().then(() => {
        expect(wrapper.vm.getValue()).toBe(null);
      });
    });

    it('deselects first suggestion after list start', () => {
      wrapper.vm.nextItem();
      wrapper.vm.prevItem();
      return wrapper.vm.$nextTick().then(() => {
        expect(wrapper.vm.getValue()).toBe(null);
      });
    });

    it('selects last suggestion in circle when selecting previous item', () => {
      wrapper.vm.nextItem();
      wrapper.vm.prevItem();
      wrapper.vm.prevItem();
      return wrapper.vm.$nextTick().then(() => {
        expect(wrapper.vm.getValue()).toBe('2');
      });
    });

    it('selects first suggestion in circle when selecting next item', () => {
      wrapper.vm.nextItem();
      wrapper.vm.nextItem();
      wrapper.vm.nextItem();
      wrapper.vm.nextItem();
      return wrapper.vm.$nextTick().then(() => {
        expect(wrapper.vm.getValue()).toBe('1');
      });
    });

    it('highlights suggestion if initial-value is provided', () => {
      wrapper.setProps({ initialValue: '2' });
      return wrapper.vm.$nextTick().then(() => {
        expect(wrapper.find('.gl-filtered-search-suggestion-active').text()).toBe('2');
      });
    });

    it('does not highlight anything if initial-value matches nothing', () => {
      wrapper.setProps({ initialValue: 'missing' });
      return wrapper.vm.$nextTick().then(() => {
        expect(wrapper.find('.gl-filtered-search-suggestion-active').exists()).toBe(false);
      });
    });

    it('applies the injected suggestion-list-class to the dropdown', () => {
      expect(wrapper.classes()).toContain('custom-class');
    });
  });
});
