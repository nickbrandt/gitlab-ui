import { withKnobs, object, select, text, number, boolean } from '@storybook/addon-knobs';
import documentedStoriesOf from '../../../../documentation/documented_stories';
import { sparkline } from '../../../utils/charts/theme';
import { GlSparklineChart } from '../../../../charts';
import { GlButton, GlButtonGroup } from '../../../../index';
import readme from './sparkline.md';

// only show the storybook knob if there are more than one variants configured
const shouldShowVariantsKnob = Object.keys(sparkline.variants).length > 1;

const components = {
  GlButton,
  GlButtonGroup,
  GlSparklineChart,
};

const data = [
  ['Mon', 10],
  ['Tue', 15],
  ['Wed', 9],
  ['Thu', 22],
  ['Fri', 29],
  ['Sat', 20],
  ['Sun', 18],
];

const template = `
  <div>
    <gl-sparkline-chart
      :data="data"
      :variant="variant"
      :height="height"
      :tooltip-label="tooltipLabel"
      :show-last-y-value="showLastYValue"
    />
  </div>
`;

function generateProps({ showLastYValue = true } = {}) {
  return {
    data: {
      default: object('data', data),
    },
    variant: {
      default: shouldShowVariantsKnob
        ? select('variant', Object.keys(sparkline.variants), sparkline.defaultVariant)
        : sparkline.defaultVariant,
    },
    height: {
      default: number('height', 50, { range: true, min: 50, max: 300, step: 10 }),
    },
    tooltipLabel: {
      default: text('tooltipLabel', 'label'),
    },
    showLastYValue: {
      default: boolean('showLastYValue', showLastYValue),
    },
  };
}

documentedStoriesOf('charts|sparkline-chart', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    components,
    template,
  }))
  .add('without last y value', () => ({
    props: generateProps({ showLastYValue: false }),
    components,
    template,
  }));
