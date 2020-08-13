import { withKnobs, select, boolean } from '@storybook/addon-knobs/vue';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import {
  newButtonSizeOptions,
  newButtonCategoryOptions,
  newButtonVariantOptions,
} from '../../../utils/constants';
import readme from './button_group.md';
import { GlButtonGroup } from '../../../../index';

const components = {
  GlButtonGroup,
};

function generateProps({
  category = newButtonCategoryOptions.secondary,
  variant = newButtonVariantOptions.default,
  size = newButtonSizeOptions.medium,
} = {}) {
  const props = {
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
    vertical: {
      type: Boolean,
      default: boolean('vertical', false),
    },
  };

  return props;
}

documentedStoriesOf('base|button group', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    components,
    template: `
     <gl-button-group :vertical="vertical" :size="size">
       <gl-button :variant="variant" :category="category" :size="size">Button 1</gl-button>
       <gl-button :variant="variant" :category="category" :size="size">Button 2</gl-button>
     </gl-button-group>
    `,
  }))
  .add('with dropdowns', () => ({
    props: generateProps(),
    components,
    template: `
     <gl-button-group :vertical="vertical" :size="size">
       <gl-button :variant="variant" :category="category" :size="size">Button 1</gl-button>
       <gl-button :variant="variant" :category="category" :size="size">Button 2</gl-button>
       <gl-dropdown :variant="variant" :category="category" :size="size" text="Some dropdown">
        <gl-dropdown-item>First item</gl-dropdown-item>
        <gl-dropdown-item>Second item</gl-dropdown-item>
        <gl-dropdown-item>Last item</gl-dropdown-item>
       </gl-dropdown>
     </gl-button-group>
    `,
  }));
