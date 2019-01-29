import { withKnobs, select, boolean } from '@storybook/addon-knobs/vue';
import documentedStoriesOf from '../utils/documented_stories';
import { sizeOptionsWithNoDefault, badgeVariantOptions } from '../utils/constants';
import { GlBadge } from '../../index'

const components = {
  GlBadge
};

function generatePipelineBadgeProps({
  variant = badgeVariantOptions['pipeline primary'],
  size = sizeOptionsWithNoDefault.default,
} = {}) {
  let props = {
    variant: {
      type: String,
      default: select('variant', badgeVariantOptions, variant),
    },
    size: {
      type: String,
      default: select('size', sizeOptionsWithNoDefault, size),
    },
    active: {
      type: Boolean,
      default: boolean('active', true),
    },
    pipeline: {
      type: Boolean,
      default: boolean('pipeline', true),
    }
  };
  return props;
}

documentedStoriesOf('base|badge', '')
  .addDecorator(withKnobs)
  .add('default', () => ({
    template: `
      <gl-badge variant="primary">Test badge</gl-badge>
    `,
  }))
  .add('pipeline badge', () => ({
    props: generatePipelineBadgeProps({}),
    components,
    template: `
      <gl-badge
        :variant="variant"
        :size="size"
        :active="active"
        :pipeline="pipeline"
      >
        Pipeline badge
      </gl-badge>
    `
  }));
