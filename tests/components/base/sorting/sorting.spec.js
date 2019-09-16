import { mount, createLocalVue } from '@vue/test-utils';
import GlSort from '../../../../components/base/sorting/sorting.vue';
import GlSortingItem from '../../../../components/base/sorting/sorting_item';
import GlDropdownItem from '../../../../components/base/dropdown/dropdown_item.vue';

const localVue = createLocalVue();

describe('sorting component', () => {
  let wrapper;

  const defaultDropdownText = 'Sorting component';
  const isAscending = false;

  const defaultProps = {
    text: defaultDropdownText,
    isAscending,
  };

  const selectDropdownButton = () => wrapper.find('.gl-dropdown button');
  const selectDirectionButton = (icon = '') => wrapper.find(`.sorting-direction-button ${icon}`);

  const createComponent = propsData => {
    wrapper = mount(GlSort, {
      components: {
        GlSortingItem,
      },
      slots: {
        default: [
          '<gl-sorting-item :active="true">First item</gl-sorting-item>',
          '<gl-sorting-item>Second item</gl-sorting-item>',
          '<gl-sorting-item>Third item</gl-sorting-item>',
        ],
      },
      localVue,
      propsData: {
        ...defaultProps,
        ...propsData,
      },
      stubs: {
        GlSortingItem,
        GlDropdownItem,
      },
    });
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it('should display default text in dropdown', () => {
    createComponent();

    expect(wrapper.vm.text).toBe(defaultDropdownText);
    expect(selectDropdownButton().text()).toBe(defaultDropdownText);
  });

  it('should have a default sort direction of desc and displays the descending icon', () => {
    createComponent();

    expect(wrapper.vm.isAscending).toBe(false);
    expect(wrapper.find('.btn-group div + button i').classes()).toContain('fa-sort-amount-desc');
  });

  it('should show new text value when passed in as a prop', () => {
    const newDropdownText = 'Some new text';

    createComponent({
      ...defaultProps,
      text: newDropdownText,
    });

    expect(wrapper.vm.text).toBe(newDropdownText);
    expect(selectDropdownButton().text()).toBe(newDropdownText);
  });

  it('should accept isAscending true as a default sort direction and display the ascending icon', () => {
    createComponent({
      ...defaultProps,
      isAscending: true,
    });

    expect(wrapper.vm.isAscending).toBe(true);
    expect(selectDirectionButton('i').classes()).toContain('fa-sort-amount-asc');
  });

  it('should emit the sortDirectionChange event when direction button is clicked', () => {
    createComponent();

    selectDirectionButton().trigger('click');

    expect(wrapper.emitted().sortDirectionChange[0]).toEqual([true]);
  });

  it('should allow custom sort tooltip to be applied', () => {
    const newDirectionTooltip = 'New tooltip text';

    createComponent({
      ...defaultProps,
      sortDirectionToolTip: newDirectionTooltip,
    });

    expect(wrapper.vm.sortDirectionToolTip).toBe(newDirectionTooltip);
    expect(selectDirectionButton().attributes('data-original-title')).toBe(newDirectionTooltip);
  });
});
