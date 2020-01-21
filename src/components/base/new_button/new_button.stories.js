import { withKnobs, select, boolean, text } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import {
  newButtonCategoryOptions,
  newButtonVariantOptions,
  newButtonSizeOptions,
  targetOptions,
} from '../../../utils/constants';
import readme from './new_button.md';
import { GlNewButton } from '../../../../index';

const components = {
  GlNewButton,
};

function generateProps({
  category = newButtonCategoryOptions.tertiary,
  variant = newButtonVariantOptions.default,
  size = newButtonSizeOptions.medium,
  withLink = false,
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
      default: boolean('block', false),
    },
    disabled: {
      type: Boolean,
      default: boolean('disabled', false),
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

documentedStoriesOf('base|new-button', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    components,
    template: `
      <gl-new-button
        :category="category"
        :variant="variant"
        :size="size"
        :block="block"
        :disabled="disabled"
      >
        This is a button
      </gl-new-button>
    `,
  }))
  .add('link button', () => ({
    props: generateProps({ withLink: true }),
    components,
    template: `
      <gl-new-button
        :category="category"
        :variant="variant"
        :size="size"
        :block="block"
        :disabled="disabled"
        :href="href"
        :target="target"
      >
        This is a link button
      </gl-new-button>
    `,
  }));
