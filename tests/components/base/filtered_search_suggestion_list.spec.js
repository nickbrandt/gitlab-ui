import { shallowMount, mount } from '@vue/test-utils';
import FilteredSearchSuggestionList from '../../../src/components/base/filtered_search/filtered_search_suggestion_list.vue';
import FilteredSearchSuggestion from '../../../src/components/base/filtered_search/filtered_search_suggestion.vue';

describe('Filtered search suggestion list component', () => {
  let wrapper;

  describe('suggestions API', () => {
    beforeEach(() => {
      wrapper = shallowMount(FilteredSearchSuggestionList, {
        sync: false,
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
        stubs.forEach(s => {
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

      it('selects first item on multiple out-of-order prevItem calls', () => {
        wrapper.vm.nextItem();
        wrapper.vm.prevItem();
        wrapper.vm.prevItem();
        wrapper.vm.nextItem();
        return wrapper.vm.$nextTick().then(() => {
          expect(wrapper.vm.getValue()).toBe(stubs[0].value);
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
    beforeEach(() => {
      wrapper = mount(FilteredSearchSuggestionList, {
        sync: false,
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
  });
});