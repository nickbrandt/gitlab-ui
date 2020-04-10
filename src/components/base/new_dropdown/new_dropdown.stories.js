import { withKnobs, select, boolean } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import {
  newButtonCategoryOptions,
  newDropdownVariantOptions,
  newButtonSizeOptions,
} from '../../../utils/constants';
import readme from './new_dropdown.md';
import {
  GlAvatar,
  GlIcon,
  GlNewDropdown,
  GlNewDropdownDivider,
  GlNewDropdownHeader,
  GlNewDropdownItem,
  GlNewDropdownText,
} from '../../../../index';

const components = {
  GlAvatar,
  GlIcon,
  GlNewDropdown,
  GlNewDropdownDivider,
  GlNewDropdownHeader,
  GlNewDropdownItem,
  GlNewDropdownText,
};

function addClass(component) {
  component.$el.querySelectorAll('.btn').forEach(el => el.classList.add('gl-button'));
}

function generateProps({
  category = newButtonCategoryOptions.tertiary,
  variant = newDropdownVariantOptions.default,
  size = newButtonSizeOptions.medium,
  block = false,
} = {}) {
  const props = {
    category: {
      type: String,
      default: select('category', newButtonCategoryOptions, category),
    },
    variant: {
      type: String,
      default: select('variant', newDropdownVariantOptions, variant),
    },
    size: {
      type: String,
      default: select('size', newButtonSizeOptions, size),
    },
    block: {
      type: Boolean,
      default: boolean('block', block),
    },
    disabled: {
      type: Boolean,
      default: boolean('disabled', false),
    },
  };

  return props;
}

function clickDropdown(component) {
  component.$nextTick(() => component.$el.querySelector('.dropdown-toggle').click());
}

documentedStoriesOf('base|new-dropdown', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    components,
    template: `
      <gl-new-dropdown
        ref="dropdown"
        text="Some dropdown"
        :category="category"
        :variant="variant"
        :size="size"
        :block="block"
        :disabled="disabled"
      >
        <gl-new-dropdown-item>First item</gl-new-dropdown-item>
        <gl-new-dropdown-item>Second item</gl-new-dropdown-item>
        <gl-new-dropdown-item>Third item</gl-new-dropdown-item>
        <gl-new-dropdown-item>Fourth item</gl-new-dropdown-item>
        <gl-new-dropdown-item>Fifth item</gl-new-dropdown-item>
        <gl-new-dropdown-item>Sixth item</gl-new-dropdown-item>
        <gl-new-dropdown-item>Seventh item</gl-new-dropdown-item>
        <gl-new-dropdown-item>Eighth item</gl-new-dropdown-item>
        <gl-new-dropdown-item>Ninth item</gl-new-dropdown-item>
        <gl-new-dropdown-item>Tenth item</gl-new-dropdown-item>
        <gl-new-dropdown-item>Eleventh item</gl-new-dropdown-item>
      </gl-new-dropdown>`,
    mounted() {
      clickDropdown(this);
    },
    updated() {
      addClass(this);
    },
  }))
  .add('with divider', () => ({
    props: generateProps(),
    components,
    template: `
      <gl-new-dropdown
        text="Some dropdown"
        :category="category"
        :variant="variant"
        :size="size"
        :block="block"
        :disabled="disabled"
      >
        <gl-new-dropdown-item>First item</gl-new-dropdown-item>
        <gl-new-dropdown-item>Second item</gl-new-dropdown-item>
        <gl-new-dropdown-divider />
        <gl-new-dropdown-item>Third item</gl-new-dropdown-item>
        <gl-new-dropdown-item>Fourth item</gl-new-dropdown-item>
      </gl-new-dropdown>`,
    mounted() {
      clickDropdown(this);
    },
    updated() {
      addClass(this);
    },
  }))
  .add('with header', () => ({
    props: generateProps(),
    components,
    template: `
      <gl-new-dropdown
        text="Some dropdown"
        :category="category"
        :variant="variant"
        :size="size"
        :block="block"
        :disabled="disabled"
      >
        <gl-new-dropdown-header>Header title</gl-new-dropdown-header>
        <gl-new-dropdown-item>First item</gl-new-dropdown-item>
        <gl-new-dropdown-item>Second item</gl-new-dropdown-item>
      </gl-new-dropdown>`,
    mounted() {
      clickDropdown(this);
    },
    updated() {
      addClass(this);
    },
  }))
  .add('with checked items', () => ({
    props: generateProps(),
    components,
    template: `
      <gl-new-dropdown
        text="Some dropdown"
        :category="category"
        :variant="variant"
        :size="size"
        :block="block"
        :disabled="disabled"
      >
        <gl-new-dropdown-item :is-check-item="true" :is-checked="true">Checked item</gl-new-dropdown-item>
        <gl-new-dropdown-item :is-check-item="true">Unchecked item</gl-new-dropdown-item>
      </gl-new-dropdown>`,
    mounted() {
      clickDropdown(this);
    },
    updated() {
      addClass(this);
    },
  }))
  .add('with avatar and secondary text', () => ({
    props: generateProps(),
    components,
    template: `
      <gl-new-dropdown
        text="Some dropdown"
        :category="category"
        :variant="variant"
        :size="size"
        :block="block"
        :disabled="disabled"
      >
        <gl-new-dropdown-item
          avatar-url="https://secure.gravatar.com/avatar/78b060780d36f51a6763ac9831a4f022?s=180&d=identicon"
          secondary-text="@sytses"
        >
          Sid Sijbrandij
        </gl-new-dropdown-item>
      </gl-new-dropdown>`,
    mounted() {
      clickDropdown(this);
    },
    updated() {
      addClass(this);
    },
  }))
  .add('with icons', () => ({
    props: generateProps(),
    components,
    template: `
      <gl-new-dropdown
        text="Some dropdown"
        :category="category"
        :variant="variant"
        :size="size"
        :block="block"
        :disabled="disabled"
      >
        <gl-new-dropdown-item
          icon-color="info"
          icon-name="status_running"
          icon-right-name="retry"
        >
          Status running
        </gl-new-dropdown-item>
        <gl-new-dropdown-item
          icon-color="success"
          icon-name="status_success"
          icon-right-name="cancel"
        >
          Status success
        </gl-new-dropdown-item>
        <gl-new-dropdown-item
          icon-color="warning"
          icon-name="status_warning"
          icon-right-name="cancel"
        >
          Status warning
        </gl-new-dropdown-item>
        <gl-new-dropdown-item
          icon-color="danger"
          icon-name="status_failed"
          icon-right-name="cancel"
        >
          Status failed
        </gl-new-dropdown-item>
        <gl-new-dropdown-item
          icon-name="status_manual"
          icon-right-name="cancel"
        >
          Status manual
        </gl-new-dropdown-item>
      </gl-new-dropdown>`,
    mounted() {
      clickDropdown(this);
    },
    updated() {
      addClass(this);
    },
  }))
  .add('with menu header', () => ({
    props: generateProps(),
    components,
    template: `
      <gl-new-dropdown
        text="Some dropdown"
        header-text="Header"
        :category="category"
        :variant="variant"
        :size="size"
        :block="block"
        :disabled="disabled"
      >
        <gl-new-dropdown-text><gl-search-box-by-type /></gl-new-dropdown-text>
      </gl-new-dropdown>`,
    mounted() {
      clickDropdown(this);
    },
    updated() {
      addClass(this);
    },
  }))
  .add('full width', () => ({
    props: generateProps({ block: true }),
    components,
    template: `
      <gl-new-dropdown
        text="Some dropdown"
        :category="category"
        :variant="variant"
        :size="size"
        :block="block"
        :disabled="disabled"
      >
        <gl-new-dropdown-item>First item</gl-new-dropdown-item>
        <gl-new-dropdown-item>Second item</gl-new-dropdown-item>
        <gl-new-dropdown-item>Last item</gl-new-dropdown-item>
      </gl-new-dropdown>`,
    mounted() {
      clickDropdown(this);
    },
    updated() {
      addClass(this);
    },
  }));
