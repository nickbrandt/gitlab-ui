import { withKnobs, select, boolean, text } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import {
  buttonCategoryOptions,
  buttonSizeOptions,
  buttonVariantOptions,
  deprecatedButtonVariantOptions,
  deprecatedButtonOutlineVariantOptions,
  targetOptions,
} from '../../../utils/constants';
import readme from './button.md';
import { GlButton } from '../../../../index';

const components = {
  GlButton,
};

function generateProps({
  category = buttonCategoryOptions.tertiary,
  variant = buttonVariantOptions.info,
  size = buttonSizeOptions.medium,
  withLink = false,
  withDeprecatedValues = false,
  loading = false,
} = {}) {
  if (withDeprecatedValues) {
    return {
      variant: {
        type: String,
        default: select(
          'variant',
          { ...deprecatedButtonVariantOptions, ...deprecatedButtonOutlineVariantOptions },
          variant
        ),
      },
      size: {
        type: String,
        default: select('size', buttonSizeOptions, size),
      },
      disabled: {
        type: Boolean,
        default: boolean('disabled', false),
      },
    };
  }

  let props = {
    category: {
      type: String,
      default: select('category', buttonCategoryOptions, category),
    },
    variant: {
      type: String,
      default: select('variant', buttonVariantOptions, variant),
    },
    size: {
      type: String,
      default: select('size', buttonSizeOptions, size),
    },
    disabled: {
      type: Boolean,
      default: boolean('disabled', false),
    },
  };

  if (loading) {
    props = {
      ...props,
      loading: {
        type: Boolean,
        default: boolean('loading', true),
      },
    };
  }

  if (withLink) {
    props = {
      ...props,
      href: {
        type: String,
        default: text('href', '#'),
      },
      target: {
        type: String,
        default: select('target', targetOptions, null),
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
        :disabled="disabled"
      >
        This is a button
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
        :disabled="disabled"
        :href="href"
        :target="target"
      >
        This is a link button
      </gl-button>
    `,
  }))
  .add('loading button', () => ({
    props: generateProps({ loading: true }),
    components,
    template: `
      <gl-button
        :loading="loading"
        :variant="variant"
        :size="size"
        :disabled="disabled"
      >
        This is a loading button
      </gl-button>
    `,
  }))
  .add('deprecated variants', () => ({
    props: generateProps({
      variant: deprecatedButtonVariantOptions.primary,
      withDeprecatedValues: true,
    }),
    components,
    template: `
      <gl-button
        :variant="variant"
        :size="size"
        :disabled="disabled"
      >
        This is a button
      </gl-button>
    `,
  }));
