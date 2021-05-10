import { withKnobs, select, boolean, text } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { GlButton } from '../../../../index';
import {
  newButtonCategoryOptions,
  newButtonVariantOptions,
  newButtonSizeOptions,
  badgeForButtonOptions,
  targetOptions,
} from '../../../utils/constants';
import readme from './button.md';

const components = {
  GlButton,
};

function generateProps({
  category = newButtonCategoryOptions.primary,
  variant = newButtonVariantOptions.default,
  size = newButtonSizeOptions.medium,
  withLink = false,
  block = false,
  loading = false,
} = {}) {
  let props = {
    category: {
      type: String,
      default: select('category', newButtonCategoryOptions, category),
    },
    variant: {
      type: String,
      default: select('variant', Object.values(newButtonVariantOptions), variant),
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
    loading: {
      type: Boolean,
      default: boolean('loading', loading),
    },
  };

  if (withLink) {
    props = {
      ...props,
      href: {
        type: String,
        default: text('href', '#'),
      },
      target: {
        type: String,
        default: select('target', targetOptions, targetOptions.null),
      },
    };
  }

  return props;
}

documentedStoriesOf('base/button', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    components,
    template: `
      <gl-button
        :category="category"
        :variant="variant"
        :size="size"
        :block="block"
        :disabled="disabled"
        :loading="loading"
      >
        This is a button
      </gl-button>
    `,
  }))
  .add('block button', () => ({
    props: generateProps({ block: true }),
    components,
    template: `
      <gl-button
        :category="category"
        :variant="variant"
        :size="size"
        :block="block"
        :disabled="disabled"
        :loading="loading"
      >
        This is a block button
      </gl-button>
    `,
  }))
  .add('icon button', () => ({
    props: generateProps({
      category: newButtonCategoryOptions.primary,
      variant: newButtonVariantOptions.danger,
    }),
    components,
    template: `
      <gl-button
        :category="category"
        :variant="variant"
        :size="size"
        :block="block"
        :disabled="disabled"
        :loading="loading"
        icon="star-o"
      />
    `,
  }))
  .add('dropdown button', () => ({
    props: generateProps(),
    components,
    template: `
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
    `,
  }))
  .add('dropdown icon button', () => ({
    props: generateProps(),
    components,
    template: `
      <gl-dropdown
        icon="download"
        :category="category"
        :variant="variant"
        :size="size"
        :block="block"
        :disabled="disabled"
      >
        <gl-dropdown-item>Dropdown item</gl-dropdown-item>
      </gl-dropdown>
    `,
  }))
  .add('dropdown icon only button', () => ({
    props: generateProps(),
    components,
    template: `
      <gl-dropdown
        icon="ellipsis_v"
        :category="category"
        :variant="variant"
        :size="size"
        :block="block"
        :disabled="disabled"
        no-caret
      >
        <gl-dropdown-item>Dropdown item</gl-dropdown-item>
      </gl-dropdown>
    `,
  }))
  .add('dropdown split button', () => ({
    props: generateProps({ category: 'primary', variant: 'confirm' }),
    components,
    template: `
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
    `,
  }))
  .add('dropdown icon split button', () => ({
    props: generateProps({ category: 'secondary', variant: 'danger' }),
    components,
    template: `
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
    `,
  }))
  .add('dropdown loading button', () => ({
    props: generateProps({ category: 'secondary' }),
    components,
    template: `
      <gl-dropdown text="Some dropdown" :category="category" :loading="true">
        <gl-dropdown-item>Dropdown item</gl-dropdown-item>
      </gl-dropdown>
    `,
  }))
  .add('loading button', () => ({
    props: generateProps({ loading: true }),
    components,
    template: `
      <gl-button
        :category="category"
        :variant="variant"
        :size="size"
        :block="block"
        :disabled="disabled"
        :loading="loading"
      >
        Loading button
      </gl-button>
    `,
  }))
  .add('link button', () => ({
    props: generateProps({ withLink: true }),
    components,
    template: `
      <gl-button
        :category="category"
        :variant="variant"
        :size="size"
        :block="block"
        :disabled="disabled"
        :loading="loading"
        :href="href"
        :target="target"
      >
        This is a link button
      </gl-button>
    `,
  }))
  .add('icon button with overflowed text', () => ({
    props: generateProps(),
    components,
    template: `
        <gl-button
          :category="category"
          :variant="variant"
          :size="size"
          :block="block"
          :disabled="disabled"
          :loading="loading"
          icon="star-o"
          style="width: 130px;"
        >
            Apply suggestion
        </gl-button>
    `,
  }))
  .add('borderless (tertiary)', () => ({
    props: generateProps({ category: 'tertiary' }),
    components,
    template: `
      <div class="gl-display-inline-flex">
        <gl-button
          :category="category"
          :size="size"
          :block="block"
          :disabled="disabled"
          :loading="loading"
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
        >
            Primary borderless
        </gl-button>
      </div>
    `,
  }))
  .add('with badge', () => ({
    props: generateProps({
      category: newButtonCategoryOptions.primary,
      variant: newButtonVariantOptions.confirm,
    }),
    components,
    computed: {
      badgeVariant() {
        return badgeForButtonOptions[this.variant];
      },
    },
    template: `
      <div>
        <gl-button :category="category" :variant="variant" :size="size">
          Submit review
          <gl-badge size="sm" :variant="badgeVariant" class="gl-ml-2">42</gl-badge>
        </gl-button>
      </div>
    `,
  }))
  .add('label button', () => ({
    components,
    template: `
      <div>
        <gl-button label>Label</gl-button>
        <gl-button size="small" label>Label</gl-button>
        <gl-button-group>
          <gl-button id="commit-sha-label" class="gl-font-monospace" label>
            b29cc44d
          </gl-button>
          <gl-button aria-describedby="commit-sha-label" icon="duplicate" />
          <gl-button icon="folder-open" />
        </gl-button-group>
      </div>
    `,
  }));
