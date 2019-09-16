import { shallowMount } from '@vue/test-utils';
import GlSortingItem from '../../../../components/base/sorting/sorting_item';
import GlDropdownItem from '../../../../components/base/dropdown/dropdown_item.vue';

describe('sorting item component', () => {
  let wrapper;

  const sortingItemText = 'Some test text';

  const defaultProps = {};

  const findActiveIcon = () => wrapper.find('.js-active-icon');
  const findGlDropdownItem = () => wrapper.find(GlDropdownItem);

  const createComponent = propsData => {
    wrapper = shallowMount(GlSortingItem, {
      context: {
        children: [sortingItemText],
        props: {
          ...defaultProps,
          ...propsData,
        },
      },
      stubs: {
        GlDropdownItem,
      },
    });
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it('should render and display the supplied text', () => {
    createComponent();

    expect(wrapper.text()).toBe(sortingItemText);
  });

  it('does not show the check icon when the active prop is not provided', () => {
    createComponent();

    expect(findActiveIcon()).toBeTruthy();
    expect(findActiveIcon().attributes('class')).toContain('invisible');
  });

  it('does render a check icon when the active prop is provided', () => {
    createComponent({
      active: true,
    });

    expect(findActiveIcon().exists()).toBeTruthy();
    expect(findActiveIcon().attributes('class')).not.toContain('invisible');
  });

  it('passes the props down to the gl-dropdown-item component', () => {
    const url = 'https://about.gitlab.com';

    createComponent({
      active: true,
      href: url,
    });

    expect(findGlDropdownItem().attributes('active')).toBe('true');
    expect(findGlDropdownItem().attributes('href')).toBe(url);
  });
});
