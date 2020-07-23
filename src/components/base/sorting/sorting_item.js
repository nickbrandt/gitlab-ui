import GlDeprecatedDropdownItem from '../deprecated_dropdown/deprecated_dropdown_item.vue';
import GlIcon from '../icon/icon.vue';

/**
 * Sorting Item
 *
 * This is written as a functional component because it is a simple wrapper over
 * the GlDropdownItem component and does not use internal state. Functional
 * components are cheaper to render and often used as wrappers like this. We're
 * not using the <template functional> syntax here because it does not support
 * custom child components wihtout extra work inside GitLab or extra work
 * required by the user.
 */

export default {
  functional: true,
  name: 'GlSortingItem',
  props: {
    active: {
      type: Boolean,
      default: false,
      required: false,
    },
    href: {
      type: String,
      default: null,
      required: false,
    },
  },
  render(createElement, { children, data, props = {} }) {
    const classNames = `gl-sorting-item js-active-icon ${props.active ? '' : 'inactive'}`;
    const icon = createElement(GlIcon, {
      class: classNames,
      attrs: {
        name: 'mobile-issue-close',
        size: 16,
        ariaLabel: 'Selected',
      },
    });

    return createElement(
      GlDeprecatedDropdownItem,
      {
        ...data,
        attrs: {
          ...props,
        },
      },
      [icon, children]
    );
  },
};
