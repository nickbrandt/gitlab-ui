import { mount } from '@vue/test-utils';

import { newDropdownVariantOptions } from '../../../utils/constants';
import GlLoadingIcon from '../loading_icon/loading_icon.vue';
import GlDropdown from './dropdown.vue';

const DEFAULT_BTN_CLASSES = ['btn', 'btn-default', 'btn-md', 'gl-button'];
const DEFAULT_BTN_TOGGLE_CLASSES = [
  'btn',
  'btn-default',
  'btn-md',
  'gl-button',
  'dropdown-toggle',
  'gl-dropdown-toggle',
];

describe('new dropdown', () => {
  let wrapper;

  const buildWrapper = (propsData, slots = {}) => {
    wrapper = mount(GlDropdown, {
      propsData,
      slots,
    });
  };

  afterEach(() => wrapper.destroy());

  const findSplitButton = () => wrapper.find('.btn:not(.gl-dropdown-toggle)');
  const findDropdownToggle = () => wrapper.find('.btn.gl-dropdown-toggle');
  const findLoadingIcon = () => wrapper.findComponent(GlLoadingIcon);
  const findIcon = () => wrapper.find('.dropdown-icon');
  const findCaret = () => wrapper.find('.dropdown-chevron');

  it('renders when text is null', () => {
    buildWrapper({ text: null });

    expect(wrapper.exists()).toBe(true);
  });

  describe('disabled state', () => {
    it('is not disabled by default', () => {
      buildWrapper({});

      expect(findDropdownToggle().attributes('disabled')).toBe(undefined);
    });

    it('can be disabled', () => {
      buildWrapper({ disabled: true });

      expect(findDropdownToggle().attributes('disabled')).toBe('disabled');
    });

    it('can be disabled via the loading prop', () => {
      buildWrapper({ loading: true });

      expect(findDropdownToggle().attributes('disabled')).toBe('disabled');
    });
  });

  describe.each`
    props                                                | toggleClasses
    ${{}}                                                | ${[]}
    ${{ text: 'text' }}                                  | ${[]}
    ${{ text: 'text', icon: 'close' }}                   | ${['dropdown-icon-text']}
    ${{ icon: 'close' }}                                 | ${['dropdown-icon-only']}
    ${{ icon: 'close', text: 'text', textSrOnly: true }} | ${['dropdown-icon-only']}
    ${{ icon: 'close', textSrOnly: true }}               | ${['dropdown-icon-only']}
  `('dropdown with props $props', ({ props, toggleClasses }) => {
    beforeEach(async () => {
      buildWrapper(props);

      await wrapper.vm.$nextTick();
    });

    it('sets toggle button classes', () => {
      const classes = findDropdownToggle().classes().sort();

      expect(classes).toEqual([...DEFAULT_BTN_TOGGLE_CLASSES, ...toggleClasses].sort());
    });
  });

  describe.each`
    props                              | splitClasses                                             | toggleClasses
    ${{}}                              | ${[]}                                                    | ${[]}
    ${{ text: 'text' }}                | ${['split-content-button']}                              | ${[]}
    ${{ text: 'text', icon: 'close' }} | ${['split-content-button', 'icon-split-content-button']} | ${['dropdown-icon-text']}
    ${{ icon: 'close' }}               | ${['icon-split-content-button']}                         | ${['dropdown-icon-only']}
  `('split dropdown with props $props', ({ props, splitClasses, toggleClasses }) => {
    beforeEach(async () => {
      buildWrapper({ split: true, ...props });

      await wrapper.vm.$nextTick();
    });

    it('updates split button classes', () => {
      const classes = findSplitButton().classes().sort();

      expect(classes).toEqual(
        expect.arrayContaining([...DEFAULT_BTN_CLASSES, ...splitClasses].sort())
      );
    });

    it('updates dropdown toggle button classes', () => {
      const classes = findDropdownToggle().classes().sort();

      expect(classes).toEqual(
        expect.arrayContaining(
          [...DEFAULT_BTN_TOGGLE_CLASSES, 'dropdown-toggle-split', ...toggleClasses].sort()
        )
      );
    });
  });

  describe('with split false', () => {
    beforeEach(async () => {
      buildWrapper({ split: false });

      await wrapper.vm.$nextTick();
    });

    it('does not show split button', () => {
      expect(findSplitButton().exists()).toBe(false);
    });

    it('shows toggle button', () => {
      const classes = findDropdownToggle().classes().sort();

      expect(classes).toEqual(expect.arrayContaining([...DEFAULT_BTN_TOGGLE_CLASSES].sort()));
    });
  });

  // This spec is needed because the split button is updated through raw DOM manipulation
  describe('with split and component updates', () => {
    beforeEach(async () => {
      buildWrapper({ split: false });

      await wrapper.vm.$nextTick();

      wrapper.setProps({ split: true, text: 'text' });

      await wrapper.vm.$nextTick();
    });

    it('updates split button classes', () => {
      expect(findSplitButton().classes().sort()).toEqual(
        expect.arrayContaining([...DEFAULT_BTN_CLASSES, 'split-content-button'])
      );
    });
  });

  describe.each`
    toggleClass             | expectedClasses                                      | type
    ${'my-class'}           | ${[...DEFAULT_BTN_TOGGLE_CLASSES, 'my-class']}       | ${'string'}
    ${{ 'my-class': true }} | ${[...DEFAULT_BTN_TOGGLE_CLASSES, 'my-class']}       | ${'object'}
    ${['cls-1', 'cls-2']}   | ${[...DEFAULT_BTN_TOGGLE_CLASSES, 'cls-1', 'cls-2']} | ${'array'}
    ${null}                 | ${[...DEFAULT_BTN_TOGGLE_CLASSES]}                   | ${'null'}
  `('with toggle classes', ({ toggleClass, expectedClasses, type }) => {
    beforeEach(async () => {
      buildWrapper({ toggleClass });

      await wrapper.vm.$nextTick();
    });

    it(`class is inherited from toggle class of type ${type}`, () => {
      expect(findDropdownToggle().classes().sort()).toEqual(
        expect.arrayContaining(expectedClasses.sort())
      );
    });
  });

  describe('secondary category', () => {
    it.each(Object.keys(newDropdownVariantOptions))(
      'applies %s variant class properly',
      (variant) => {
        buildWrapper({ category: 'secondary', variant });

        expect(findDropdownToggle().classes()).toContain(`btn-${variant}-secondary`);
      }
    );
  });

  describe('when the header slot exists', () => {
    const slots = { header: 'Header Content' };

    it('renders the header', () => {
      buildWrapper({}, slots);
      expect(wrapper.find('.gl-new-dropdown-header').exists()).toBeTruthy();
      expect(wrapper.html()).toContain('Header Content');
    });

    it('has the "gl-border-b-0!" class when header border disabled', () => {
      buildWrapper({ hideHeaderBorder: true }, slots);
      expect(wrapper.find('.gl-new-dropdown-header').classes()).toContain('gl-border-b-0!');
    });
  });

  describe('with no header slot exists', () => {
    it('does not render the header', () => {
      buildWrapper();
      expect(wrapper.find('.gl-new-dropdown-header').exists()).toBeFalsy();
    });

    it('does render the header if headerText provided', () => {
      buildWrapper({ headerText: 'Legacy Header Prop Text' });
      expect(wrapper.find('.gl-new-dropdown-header').exists()).toBeTruthy();
      expect(wrapper.html()).toContain('Legacy Header Prop Text');
    });
  });

  describe('when the footer slot exists', () => {
    const slots = { footer: 'Footer Content' };

    it('renders the footer', () => {
      buildWrapper({}, slots);
      expect(wrapper.find('.gl-new-dropdown-footer').exists()).toBeTruthy();
      expect(wrapper.html()).toContain('Footer Content');
    });
  });

  describe('with no footer slot exists', () => {
    it('does not render the footer', () => {
      buildWrapper();
      expect(wrapper.find('.gl-new-dropdown-footer').exists()).toBeFalsy();
    });
  });

  describe('button content templates', () => {
    const mockComponent = {
      template: '<span>mock</span>',
    };

    it('shows the button text template with the default loading spinner, icon, and dropdown caret', () => {
      const slots = { 'button-text': mockComponent };
      buildWrapper({ loading: true, icon: 'close' }, slots);
      expect(wrapper.findComponent(mockComponent).exists()).toBe(true);
      expect(findLoadingIcon().exists()).toBe(true);
      expect(findIcon().exists()).toBe(true);
      expect(findCaret().exists()).toBe(true);
    });

    it('shows only the button content template', () => {
      const slots = { 'button-content': mockComponent };
      buildWrapper({ loading: true, icon: 'close' }, slots);
      expect(wrapper.findComponent(mockComponent).exists()).toBe(true);
      expect(findLoadingIcon().exists()).toBe(false);
      expect(findIcon().exists()).toBe(false);
      expect(findCaret().exists()).toBe(false);
    });
  });
});
