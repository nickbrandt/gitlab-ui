import { withKnobs, select, boolean } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import {
  newButtonCategoryOptions,
  newDropdownVariantOptions,
  newButtonSizeOptions,
} from '../../../utils/constants';
import readme from './new_dropdown.md';
import {
  GlNewDropdown,
  GlDropdownDivider,
  GlDropdownHeader,
  GlDropdownItem,
} from '../../../../index';

const components = {
  GlNewDropdown,
  GlDropdownDivider,
  GlDropdownHeader,
  GlDropdownItem,
};

function addClass(component) {
  component.$el.querySelectorAll('.btn').forEach(el => el.classList.add('new-gl-button'));
}

function generateProps({
  category = newButtonCategoryOptions.tertiary,
  variant = newDropdownVariantOptions.default,
  size = newButtonSizeOptions.medium,
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
      default: boolean('block', false),
    },
    disabled: {
      type: Boolean,
      default: boolean('disabled', false),
    },
  };

  return props;
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
        <gl-new-dropdown-item>Last item</gl-new-dropdown-item>
      </gl-new-dropdown>`,
    mounted() {
      this.$nextTick(() => this.$el.querySelector('.dropdown-toggle').click());
    },
    updated() {
      addClass(this);
    },
  }))
  .add('with links', () => ({
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
        <gl-new-dropdown-item href="https://about.gitlab.com/">First link</gl-new-dropdown-item>
        <gl-new-dropdown-item href="https://about.gitlab.com/">Second link</gl-new-dropdown-item>
        <gl-new-dropdown-item href="https://about.gitlab.com/">Last link</gl-new-dropdown-item>
      </gl-new-dropdown>`,
    mounted() {
      this.$nextTick(() => this.$el.querySelector('.dropdown-toggle').click());
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
        <gl-new-dropdown-item>Above divider</gl-new-dropdown-item>
        <gl-new-dropdown-divider />
        <gl-new-dropdown-item>Below divider</gl-new-dropdown-item>
      </gl-new-dropdown>`,
    mounted() {
      this.$nextTick(() => this.$el.querySelector('.dropdown-toggle').click());
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
        <gl-new-dropdown-header>First group</gl-new-dropdown-header>
        <gl-new-dropdown-item>First item</gl-new-dropdown-item>
        <gl-new-dropdown-item>Second item</gl-new-dropdown-item>
        <gl-new-dropdown-divider />
        <gl-new-dropdown-header>Second group</gl-new-dropdown-header>
        <gl-new-dropdown-item>Last item</gl-new-dropdown-item>
      </gl-new-dropdown>`,
    mounted() {
      this.$nextTick(() => this.$el.querySelector('.dropdown-toggle').click());
    },
    updated() {
      addClass(this);
    },
  }));
