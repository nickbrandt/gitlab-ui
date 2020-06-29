import { mount } from '@vue/test-utils';

import GlNewDropdown from './new_dropdown.vue';

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

  const buildWrapper = propsData => {
    wrapper = mount(GlNewDropdown, {
      propsData,
    });
  };

  afterEach(() => wrapper.destroy());

  const findSplitButton = () => wrapper.find('.btn:not(.gl-dropdown-toggle)');
  const findDropdownToggle = () => wrapper.find('.btn.gl-dropdown-toggle');

  describe.each`
    props                                           | splitClasses                                             | toggleClasses
    ${{ split: true }}                              | ${[]}                                                    | ${[]}
    ${{ split: true, text: 'text' }}                | ${['split-content-button']}                              | ${[]}
    ${{ split: true, text: 'text', icon: 'close' }} | ${['split-content-button', 'icon-split-content-button']} | ${['dropdown-icon-text']}
    ${{ split: true, icon: 'close' }}               | ${['icon-split-content-button']}                         | ${['dropdown-icon-only']}
  `('with props $props', ({ props, splitClasses, toggleClasses }) => {
    beforeEach(async () => {
      buildWrapper(props);

      await wrapper.vm.$nextTick();
    });

    it('updates split button classes', () => {
      const classes = findSplitButton()
        .classes()
        .sort();

      expect(classes).toEqual([...DEFAULT_BTN_CLASSES, ...splitClasses].sort());
    });

    it('updates dropdown toggle button classes', () => {
      const classes = findDropdownToggle()
        .classes()
        .sort();

      expect(classes).toEqual(
        [...DEFAULT_BTN_TOGGLE_CLASSES, 'dropdown-toggle-split', ...toggleClasses].sort()
      );
    });
  });

  describe('with split false', () => {
    beforeEach(async () => {
      buildWrapper({ text: 'text', split: false });

      await wrapper.vm.$nextTick();
    });

    it('does not show split button', () => {
      expect(findSplitButton().exists()).toBe(false);
    });

    it('shows toggle button', () => {
      const classes = findDropdownToggle()
        .classes()
        .sort();

      expect(classes).toEqual([...DEFAULT_BTN_TOGGLE_CLASSES].sort());
    });
  });

  describe('with split false and no text', () => {
    beforeEach(async () => {
      buildWrapper({ split: false });

      await wrapper.vm.$nextTick();
    });

    it('does not show split button', () => {
      expect(findSplitButton().exists()).toBe(false);
    });

    it('shows a centered caret', () => {
      expect(findDropdownToggle().classes('dropdown-caret-only')).toBe(true);
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
      expect(
        findSplitButton()
          .classes()
          .sort()
      ).toEqual([...DEFAULT_BTN_CLASSES, 'split-content-button']);
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
      buildWrapper({ text: 'text', toggleClass });

      await wrapper.vm.$nextTick();
    });

    it(`class is inherited from toggle class of type ${type}`, () => {
      expect(
        findDropdownToggle()
          .classes()
          .sort()
      ).toEqual(expectedClasses.sort());
    });
  });
});
