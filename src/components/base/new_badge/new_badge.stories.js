import { withKnobs, select, text } from '@storybook/addon-knobs';
import documentedStoriesOf from '../../../utils/documented_stories';
import { newBadgeVariantOptions, newBadgeSizeOptions } from '../../../utils/constants';
import readme from './new_badge.md';
import { GlNewBadge } from '../../../../index';

const components = {
  GlNewBadge,
};

documentedStoriesOf('base|new-badge', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: {
      variant: {
        type: String,
        default: select('variant', newBadgeVariantOptions),
      },
      size: {
        type: String,
        default: select('size', newBadgeSizeOptions, newBadgeSizeOptions.default),
      },
      text: {
        type: String,
        default: text('Text', 'My Badge'),
      },
    },
    components,
    template: `
      <gl-new-badge
        :size="size"
        :variant="variant"
      >{{ text }}</gl-new-badge>
    `,
  }))
  .add('variants', () => ({
    components,
    template: `
      <div>
        <p>
          <gl-new-badge variant="neutral-average">Neutral average</gl-new-badge>
          <gl-new-badge variant="neutral-soft">Neutral soft</gl-new-badge>
          <gl-new-badge variant="neutral-loud">Neutral loud</gl-new-badge>
        </p>
        <p>
          <gl-new-badge variant="info-average">Info average</gl-new-badge>
          <gl-new-badge variant="info-loud">Info loud</gl-new-badge>
        </p>
        <p>
          <gl-new-badge variant="success-average">Success average</gl-new-badge>
          <gl-new-badge variant="success-loud">Success loud</gl-new-badge>
        </p>
        <p>
          <gl-new-badge variant="warning-average">Warning average</gl-new-badge>
          <gl-new-badge variant="warning-loud">Warning loud</gl-new-badge>
        </p>
        <p>
          <gl-new-badge variant="danger-average">Danger average</gl-new-badge>
          <gl-new-badge variant="danger-loud">Danger loud</gl-new-badge>
        </p>
      </div>
    `,
  }))
  .add('sizes', () => ({
    components,
    template: `
      <div>
        <gl-new-badge size="small">Small</gl-new-badge>
        <gl-new-badge size="default">Default</gl-new-badge>
        <gl-new-badge size="large">Large</gl-new-badge>
      </div>
    `,
  }));
