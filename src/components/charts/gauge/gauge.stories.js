import { withKnobs, object, number, text as textKnob, array } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './gauge.md';
import GlGauge from './gauge.vue';
import { toolbox } from '../../../utils/charts/story_config';

const template = `
  <gl-gauge 
    :value="value"
    :min="min"
    :max="max"
    :thresholds="thresholds"
    :text="text"
    :splitNumber="splitNumber"
    :option="option" 
  />
`;

function generateProps({
  value = 48,
  min = 0,
  max = 100,
  text = '',
  option = {},
  thresholds = [38, 82],
  splitNumber = 10,
} = {}) {
  return {
    option: {
      default: object('EChart Options', option),
    },
    value: {
      default: number('Value', value),
    },
    min: {
      default: number('Min', min),
    },
    max: {
      default: number('Max', max),
    },
    thresholds: {
      default: array('Thresholds', thresholds),
    },
    text: {
      default: textKnob('Detail Text', text),
    },
    splitNumber: {
      default: number('Split Number', splitNumber),
    },
  };
}

documentedStoriesOf('charts|gauge-chart', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    components: { GlGauge },
    template,
  }))
  .add('one threshold', () => ({
    props: generateProps({
      value: 65,
      thresholds: [85],
    }),
    components: { GlGauge },
    template,
  }))
  .add('two thresholds', () => ({
    props: generateProps({
      value: 90,
      thresholds: [60, 85],
    }),
    components: { GlGauge },
    template,
  }))
  .add('no thresholds', () => ({
    props: generateProps({
      value: 90,
      thresholds: [],
    }),
    components: { GlGauge },
    template,
  }))
  .add('with custom detail text', () => ({
    props: generateProps({
      value: 90,
      text: '90Mbps',
      thresholds: [60, 85],
    }),
    components: { GlGauge },
    template,
  }))
  .add('with NaN values', () => ({
    props: generateProps({
      min: 'not a number value',
      max: 'not a number value',
      value: 'not a number value',
      thresholds: [60, 85],
    }),
    components: { GlGauge },
    template,
  }))
  .add('with toolbox', () => ({
    props: generateProps({
      option: {
        toolbox,
      },
    }),
    components: { GlGauge },
    template,
  }));
