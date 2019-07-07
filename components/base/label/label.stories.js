import { withKnobs, text, color, select, boolean } from '@storybook/addon-knobs';
import documentedStoriesOf from '../../../utils/documented_stories';
import { labelSizeOptions, labelVariantOptions } from '../../../utils/constants';
import readme from './label.md';
import { GlLabel } from '../../../index';

const components = {
  GlLabel,
};

const generateProps = ({
  isScoped = false,
  size = labelSizeOptions.default,
  variant = '',
} = {}) => {
  const props = {
    color: {
      default: color('Font color', '#fff'),
    },
    backgroundColor: {
      default: color('Background color', '#D9C2EE'),
    },
    description: {
      default: text('Label description', ''),
    },
    target: {
      default: text('Link to label target', ''),
    },
    size: {
      type: String,
      default: select('size', labelSizeOptions, size),
    },
    variant: {
      type: String,
      default: select('variant', labelVariantOptions, variant),
    },
  };

  if (isScoped) {
    props.isScoped = {
      default: boolean('Scope label type', true),
    };
  }

  return props;
};

documentedStoriesOf('base|label', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    components,
    template: `
      <gl-label
        :color="color"
        :background-color="backgroundColor"
        :size="size"
        :variant="variant"
        :description="description"
        :target="target"
      >
        Basic Label
      </gl-label>`,
  }));
