import { withKnobs, select, boolean } from '@storybook/addon-knobs/dist/deprecated';
import documentedStoriesOf from '../../../utils/documented_stories';
import {
  newButtonCategoryOptions,
  newDropdownVariantOptions,
  newButtonSizeOptions,
} from '../../../utils/constants';
import readme from './new_dropdown.md';
import { GlNewDropdown, GlDropdownDivider, GlDropdownHeader, GlDropdownItem } from '../../../index';

const components = {
  GlNewDropdown,
  GlDropdownDivider,
  GlDropdownHeader,
  GlDropdownItem,
};

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
        text="Some dropdown""
        :category="category"
        :variant="variant"
        :size="size"
        :block="block"
        :disabled="disabled"
      >
        <gl-dropdown-item>First item</gl-dropdown-item>
        <gl-dropdown-item>Second item</gl-dropdown-item>
        <gl-dropdown-item>Last item</gl-dropdown-item>
      </gl-new-dropdown>`,
    mounted() {
      this.$nextTick(() => this.$el.querySelector('.dropdown-toggle').click());
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
        <gl-dropdown-item href="https://about.gitlab.com/">First link</gl-dropdown-item>
        <gl-dropdown-item href="https://about.gitlab.com/">Second link</gl-dropdown-item>
        <gl-dropdown-item href="https://about.gitlab.com/">Last link</gl-dropdown-item>
      </gl-new-dropdown>`,
    mounted() {
      this.$nextTick(() => this.$el.querySelector('.dropdown-toggle').click());
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
        <gl-dropdown-item>Above divider</gl-dropdown-item>
        <gl-dropdown-divider />
        <gl-dropdown-item>Below divider</gl-dropdown-item>
      </gl-new-dropdown>`,
    mounted() {
      this.$nextTick(() => this.$el.querySelector('.dropdown-toggle').click());
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
        <gl-dropdown-header>First group</gl-dropdown-header>
        <gl-dropdown-item>First item</gl-dropdown-item>
        <gl-dropdown-item>Second item</gl-dropdown-item>
        <gl-dropdown-divider />
        <gl-dropdown-header>Second group</gl-dropdown-header>
        <gl-dropdown-item>Last item</gl-dropdown-item>
      </gl-new-dropdown>`,
    mounted() {
      this.$nextTick(() => this.$el.querySelector('.dropdown-toggle').click());
    },
  }));
