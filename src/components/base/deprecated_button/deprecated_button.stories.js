import { withKnobs, select, boolean, text } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import {
  deprecatedButtonCategoryOptions,
  deprecatedButtonSizeOptions,
  buttonVariantOptions,
  deprecatedButtonVariantOptions,
  deprecatedButtonOutlineVariantOptions,
  targetOptions,
} from '../../../utils/constants';
import readme from './deprecated_button.md';
import { GlDeprecatedButton } from '../../../../index';

const components = {
  GlDeprecatedButton,
};

function generateProps({
  category = deprecatedButtonCategoryOptions.tertiary,
  variant = buttonVariantOptions.info,
  size = deprecatedButtonSizeOptions.medium,
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
        default: select('size', deprecatedButtonSizeOptions, size),
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
      default: select('category', deprecatedButtonCategoryOptions, category),
    },
    variant: {
      type: String,
      default: select('variant', buttonVariantOptions, variant),
    },
    size: {
      type: String,
      default: select('size', deprecatedButtonSizeOptions, size),
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

documentedStoriesOf('base|deprecated-button', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    components,
    template: `
      <gl-deprecated-button
        :category="category"
        :variant="variant"
        :size="size"
        :disabled="disabled"
      >
        This is a button
      </gl-deprecated-button>
    `,
  }))
  .add('link button', () => ({
    props: generateProps({ withLink: true }),
    components,
    template: `
      <gl-deprecated-button
        :category="category"
        :variant="variant"
        :size="size"
        :disabled="disabled"
        :href="href"
        :target="target"
      >
        This is a link button
      </gl-deprecated-button>
    `,
  }))
  .add('loading button', () => ({
    props: generateProps({ loading: true }),
    components,
    template: `
      <gl-deprecated-button
        :loading="loading"
        :variant="variant"
        :size="size"
        :disabled="disabled"
      >
        This is a loading button
      </gl-deprecated-button>
    `,
  }))
  .add('deprecated variants', () => ({
    props: generateProps({
      variant: deprecatedButtonVariantOptions.primary,
      withDeprecatedValues: true,
    }),
    components,
    template: `
      <gl-deprecated-button
        :variant="variant"
        :size="size"
        :disabled="disabled"
      >
        This is a button
      </gl-deprecated-button>
    `,
  }));
