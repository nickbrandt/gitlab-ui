/* eslint-disable import/no-default-export */
import GlDropdownItem from '../dropdown/dropdown_item.vue';
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
    const classNames = `gl-sorting-item js-active-icon gl-flex-shrink-0 gl-mr-2 ${
      props.active ? '' : 'inactive gl-visibility-hidden'
    }`;
    const icon = createElement(GlIcon, {
      class: classNames,
      attrs: {
        name: 'mobile-issue-close',
        size: 16,
        ariaLabel: 'Selected',
      },
    });

    return createElement(
      GlDropdownItem,
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
