import { withKnobs, select, boolean, text } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import {
  newButtonCategoryOptions,
  newButtonVariantOptions,
  newButtonSizeOptions,
  targetOptions,
} from '../../../utils/constants';
import readme from './button.md';
import { GlButton } from '../../../../index';

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
      default: select('variant', newButtonVariantOptions, variant),
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

documentedStoriesOf('base|button', readme)
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
          style="width: 100px;"
        >
            This is a link button
        </gl-button>
    `,
  }));
