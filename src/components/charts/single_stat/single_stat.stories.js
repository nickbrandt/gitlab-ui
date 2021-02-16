import iconSpriteInfo from '@gitlab/svgs/dist/icons.json';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import { GlSingleStat } from '../../../../charts';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { badgeVariantOptions } from '../../../utils/constants';
import readme from './single_stat.md';

const components = {
  GlSingleStat,
};

const template = `
    <gl-single-stat
      :title="title"
      :value="value"
      :unit="unit"
      :variant="variant"
      :meta-text="metaText"
      :meta-icon="metaIcon"
      :title-icon="titleIcon"
    />
  `;

const generateProps = ({
  variant = GlSingleStat.props.variant.default,
  title = 'Single stat title',
  value = '100',
  unit = 'ms',
  metaText = null,
  metaIcon = null,
  titleIcon = null,
} = {}) => ({
  variant: {
    type: String,
    default: select('variant', Object.values(badgeVariantOptions), variant),
  },
  title: {
    type: String,
    default: text('title', title),
  },
  value: {
    type: String,
    default: text('value', value),
  },
  unit: {
    type: String,
    default: text('unit', unit),
  },
  metaText: {
    type: String,
    default: text('metaText', metaText),
  },
  metaIcon: {
    type: String,
    default: select('metaIcon', ['', ...iconSpriteInfo.icons], metaIcon),
  },
  titleIcon: {
    type: String,
    default: select('titleIcon', ['', ...iconSpriteInfo.icons], titleIcon),
  },
});

const metaText = 'Super fast';
const metaIcon = 'check-circle';
const titleIcon = 'hourglass';

documentedStoriesOf('charts/single-stat', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components,
    props: generateProps(),
    template,
  }))
  .add('with badge', () => ({
    components,
    props: generateProps({ metaText, metaIcon }),
    template,
  }))
  .add('with meta icon', () => ({
    components,
    props: generateProps({ metaIcon }),
    template,
  }))
  .add('with title icon', () => ({
    components,
    props: generateProps({ titleIcon }),
    template,
  }));
