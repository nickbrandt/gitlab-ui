import { withKnobs, text, select } from '@storybook/addon-knobs';
import iconSpriteInfo from '@gitlab/svgs/dist/icons.json';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './badge.md';
import GlBadge from './badge.vue';
import { badgeSizeOptions, badgeVariantOptions } from '../../../utils/constants';

const components = {
  GlBadge,
};

const template = `
    <gl-badge
      :href="href"
      :variant="variant"
      :size="size"
      :icon="icon"
    >{{ content }}</gl-badge>
  `;

const generateProps = ({
  variant = GlBadge.props.variant.default,
  size = GlBadge.props.size.default,
  href = '',
  icon = '',
  content = 'TestBadge',
} = {}) => ({
  variant: {
    type: String,
    default: select('variant', Object.values(badgeVariantOptions), variant),
  },
  size: {
    type: String,
    default: select('size', Object.values(badgeSizeOptions), size),
  },
  href: {
    type: String,
    default: text('href', href),
  },
  content: {
    type: String,
    default: text('content', content),
  },
  icon: {
    type: String,
    default: select('icon', ['', ...iconSpriteInfo.icons], icon),
  },
});

documentedStoriesOf('base/badge', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components,
    props: generateProps(),
    template,
  }))
  .add('actionable warning', () => ({
    components,
    props: generateProps({ href: '#foo', variant: badgeVariantOptions.warning }),
    template,
  }))
  .add('large danger', () => ({
    components,
    props: generateProps({ size: badgeSizeOptions.lg, variant: badgeVariantOptions.danger }),
    template,
  }))
  .add('badge icon', () => ({
    components,
    props: generateProps({ variant: badgeVariantOptions.success, icon: 'calendar' }),
    template,
  }));
