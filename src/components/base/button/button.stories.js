import { GlButton } from '../../../../index';
import {
  newButtonCategoryOptions,
  newButtonVariantOptions,
  newButtonSizeOptions,
  targetOptions,
} from '../../../utils/constants';
import readme from './button.md';

const components = { GlButton };

const defaultValue = (prop) => GlButton.props[prop].default;

const generateProps = ({
  category = defaultValue('category'),
  variant = defaultValue('variant'),
  size = defaultValue('size'),
  withLink = false,
  href = '#',
  target = null,
  block = false,
  disabled = defaultValue('disabled'),
  loading = defaultValue('loading'),
  selected = defaultValue('selected'),
} = {}) => ({
  category,
  variant,
  size,
  block,
  disabled,
  loading,
  selected,
  ...(withLink && {
    href,
    target,
  }),
});

const wrapDropdownButton = (template) => `<div class="gl-h-11">${template}</div>`;

export const Default = (args, { argTypes = {} }) => ({
  components,
  props: Object.keys(argTypes),
  template: `
      <gl-button
        :category="category"
        :variant="variant"
        :size="size"
        :block="block"
        :disabled="disabled"
        :loading="loading"
        :selected="selected"
      >
        This is a button
      </gl-button>
    `,
});
Default.args = generateProps();

export const BlockButton = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components,
  template: `
      <gl-button
        :category="category"
        :variant="variant"
        :size="size"
        :block="block"
        :disabled="disabled"
        :loading="loading"
        :selected="selected"
      >
        This is a block button
      </gl-button>
    `,
});
BlockButton.args = generateProps({ block: true });

export const IconButton = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components,
  template: `
      <div>
        <gl-button
          :category="category"
          :variant="variant"
          :size="size"
          :block="block"
          :disabled="disabled"
          :loading="loading"
          :selected="selected"
          icon="star-o"
          aria-label="Star icon button"
        />
        <div class="gl-mt-3">
          <gl-button icon="star-o" aria-label="Star icon button" />
          <gl-button size="small" icon="star-o" aria-label="Star icon small button" />
        </div>
        <div class="gl-mt-3">
          <gl-button icon="star-o">Icon text</gl-button>
          <gl-button size="small" icon="star-o">Icon text</gl-button>
        </div>
      </div>
    `,
});
IconButton.args = generateProps({
  category: newButtonCategoryOptions.primary,
  variant: newButtonVariantOptions.danger,
});

export const DropdownButton = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components,
  template: wrapDropdownButton(`
      <gl-dropdown
        text="Some dropdown"
        :category="category"
        :variant="variant"
        :size="size"
        :block="block"
        :disabled="disabled"
      >
        <gl-dropdown-item>Dropdown item</gl-dropdown-item>
      </gl-dropdown>
    `),
});
DropdownButton.args = generateProps();

export const DropdownIconButton = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components,
  template: wrapDropdownButton(`
      <gl-dropdown
        icon="download"
        text="Download"
        :text-sr-only="true"
        :category="category"
        :variant="variant"
        :size="size"
        :block="block"
        :disabled="disabled"
      >
        <gl-dropdown-item>Dropdown item</gl-dropdown-item>
      </gl-dropdown>
    `),
});
DropdownIconButton.args = generateProps();

export const DropdownIconTextButton = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components,
  template: wrapDropdownButton(`
      <gl-dropdown
        icon="notifications"
        text="Notifications"
        :category="category"
        :variant="variant"
        :size="size"
        :block="block"
        :disabled="disabled"
      >
        <gl-dropdown-item>Dropdown item</gl-dropdown-item>
      </gl-dropdown>
    `),
});
DropdownIconTextButton.args = generateProps();

export const DropdownIconOnlyButton = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components,
  template: wrapDropdownButton(`
      <gl-dropdown
        icon="ellipsis_v"
        text="More actions"
        :text-sr-only="true"
        :category="category"
        :variant="variant"
        :size="size"
        :block="block"
        :disabled="disabled"
        no-caret
      >
        <gl-dropdown-item>Dropdown item</gl-dropdown-item>
      </gl-dropdown>
    `),
});
DropdownIconOnlyButton.args = generateProps({
  category: newButtonCategoryOptions.tertiary,
});

export const DropdownSplitButton = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components,
  template: wrapDropdownButton(`
      <gl-dropdown
        split
        text="Some dropdown"
        :category="category"
        :variant="variant"
        :size="size"
        :block="block"
        :disabled="disabled"
      >
        <gl-dropdown-item>Dropdown item</gl-dropdown-item>
      </gl-dropdown>
    `),
});
DropdownSplitButton.args = generateProps({ category: 'primary', variant: 'confirm' });

export const DropdownIconSplitButton = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components,
  template: wrapDropdownButton(`
      <gl-dropdown
        split
        icon="download"
        text="Some dropdown"
        :category="category"
        :variant="variant"
        :size="size"
        :block="block"
        :disabled="disabled"
      >
        <gl-dropdown-item>Dropdown item</gl-dropdown-item>
      </gl-dropdown>
    `),
});
DropdownIconSplitButton.args = generateProps({ category: 'secondary', variant: 'danger' });

export const DropdownLoadingButton = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components,
  template: `
      <gl-dropdown text="Some dropdown" :category="category" :loading="true">
        <gl-dropdown-item>Dropdown item</gl-dropdown-item>
      </gl-dropdown>
    `,
});
DropdownLoadingButton.args = generateProps({ category: 'secondary' });

export const LoadingButton = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components,
  template: `
      <gl-button
        :category="category"
        :variant="variant"
        :size="size"
        :block="block"
        :disabled="disabled"
        :loading="loading"
        :selected="selected"
      >
        Loading button
      </gl-button>
    `,
});
LoadingButton.args = generateProps({ loading: true });

export const LinkButton = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components,
  template: `
      <gl-button
        :category="category"
        :variant="variant"
        :size="size"
        :block="block"
        :disabled="disabled"
        :loading="loading"
        :selected="selected"
        :href="href"
        :target="target"
      >
        This is a link button
      </gl-button>
    `,
});
LinkButton.args = generateProps({ withLink: true });

export const IconButtonWithOverflowedText = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components,
  template: `
        <gl-button
          :category="category"
          :variant="variant"
          :size="size"
          :block="block"
          :disabled="disabled"
          :loading="loading"
          :selected="selected"
          icon="star-o"
          style="width: 130px;"
        >
            Apply suggestion
        </gl-button>
    `,
});
IconButtonWithOverflowedText.args = generateProps();

export const BorderlessTertiary = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components,
  template: `
      <div class="gl-display-inline-flex">
        <gl-button
          :category="category"
          :size="size"
          :block="block"
          :disabled="disabled"
          :loading="loading"
          :selected="selected"
        >
            Default borderless
        </gl-button>
        <gl-button
          variant="confirm"
          :category="category"
          :size="size"
          :block="block"
          :disabled="disabled"
          :loading="loading"
          :selected="selected"
        >
            Primary borderless
        </gl-button>
      </div>
    `,
});
BorderlessTertiary.args = generateProps({ category: 'tertiary' });

export const LabelButton = (args, { argTypes = {} }) => ({
  props: Object.keys(argTypes),
  components,
  template: `
      <div>
        <gl-button label>Label</gl-button>
        <gl-button size="small" label>Label</gl-button>
        <gl-button-group>
          <gl-button id="commit-sha-label" class="gl-font-monospace" label>
            b29cc44d
          </gl-button>
          <gl-button
            aria-describedby="commit-sha-label"
            icon="duplicate"
            aria-label="Copy commit SHA" />
          <gl-button icon="folder-open" aria-label="Open file" />
        </gl-button-group>
      </div>
    `,
});
LabelButton.parameters = { controls: { disabled: true } };

export const AllVariantsAndCategories = (args, { argTypes = {} }) => ({
  props: Object.keys(argTypes),
  components,
  variants: Object.keys(newButtonVariantOptions).filter(
    (variant) => !newButtonVariantOptions[variant].includes('deprecated')
  ),
  categories: newButtonCategoryOptions,
  style: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 150px)',
    rowGap: '10px',
    textAlign: 'center',
  },
  template: `
      <div :style="$options.style">
        <template v-for="variant in $options.variants">
          <div v-for="category in $options.categories" :key="variant + category">
            <gl-button :key="category" :category="category" :variant="variant">
              {{ category }} {{ variant }}
            </gl-button>
          </div>
        </template>
      </div>
    `,
});
AllVariantsAndCategories.parameters = { controls: { disabled: true } };

export const Emojis = (args, { argTypes = {} }) => ({
  props: Object.keys(argTypes),
  components,
  template: `
      <div>
        <gl-button selected>
          <template #emoji>
            <gl-emoji title="thumbs up sign" data-name="thumbsup" data-unicode-version="6.0"
              >????</gl-emoji
            >
          </template>
          1
        </gl-button>
        <gl-button>
          <template #emoji>
            <gl-emoji title="thumbs down sign" data-name="thumbsdown" data-unicode-version="6.0"
              >????</gl-emoji
            >
          </template>
          0
        </gl-button>
        <gl-button selected size="small">
          <template #emoji>
            <gl-emoji title="thumbs up sign" data-name="thumbsup" data-unicode-version="6.0"
              >????</gl-emoji
            >
          </template>
          1
        </gl-button>
        <gl-button size="small">
          <template #emoji>
            <gl-emoji title="thumbs down sign" data-name="thumbsdown" data-unicode-version="6.0"
              >????</gl-emoji
            >
          </template>
          0
        </gl-button>
      </div>
    `,
});
Emojis.parameters = { controls: { disabled: true } };

export const Ellipsis = (args, { argTypes = {} }) => ({
  props: Object.keys(argTypes),
  components,
  template: `
    <gl-button icon="ellipsis_h" aria-label="Ellipsis button" />
  `,
});
Ellipsis.parameters = { controls: { disabled: true } };

export const Sizes = (args, { argTypes = {} }) => ({
  props: Object.keys(argTypes),
  components,
  template: `
    <div>
      <gl-button size="small">Small button</gl-button>
      <gl-button>Default button</gl-button>
      <div class="mt-2">
        <gl-button size="small" block>Full width small button</gl-button>
      </div>
      <div class="mt-2">
        <gl-button block>Full width button</gl-button>
      </div>
    </div>
  `,
});
Sizes.parameters = { controls: { disabled: true } };

export default {
  title: 'base/button',
  component: GlButton,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
    knobs: {
      disabled: true,
    },
  },
  argTypes: {
    category: {
      control: {
        type: 'select',
        options: newButtonCategoryOptions,
      },
    },
    variant: {
      control: {
        type: 'select',
        options: newButtonVariantOptions,
      },
    },
    size: {
      control: {
        type: 'select',
        options: newButtonSizeOptions,
      },
    },
    target: {
      control: {
        type: 'select',
        options: targetOptions,
      },
    },
  },
};
