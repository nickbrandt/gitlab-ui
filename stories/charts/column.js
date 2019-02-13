import { withKnobs, object, text } from '@storybook/addon-knobs';
import documentedStoriesOf from '../utils/documented_stories';
import { GlColumnChart } from '../../charts';
import readme from '../../components/charts/column/column.md';

const components = {
  GlColumnChart,
};

function generateProps({
  data = {
    Full: [
      ['Mon', 1220],
      ['Tue', 932],
      ['Wed', 901],
      ['Thu', 934],
      ['Fri', 1290],
      ['Sat', 1330],
      ['Sun', 1320],
    ],
  },
  option = {
    xAxis: {
      type: 'category',
    },
  },
  yAxisTitle = 'Pushes per day',
  xAxisTitle = 'Username',
} = {}) {
  return {
    data: {
      type: Object,
      default: () => object('Chart Data', data),
    },
    option: {
      type: Object,
      default: () => object('Echart Options', option),
    },
    yAxisTitle: {
      type: String,
      default: text('Y Axis Title', yAxisTitle),
    },
    xAxisTitle: {
      default: text('X Axis Title', xAxisTitle),
    },
  };
}

documentedStoriesOf('charts|column-chart', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    components,
    template: `
      <gl-column-chart :data="data" :option="option" :y-axis-title="yAxisTitle" :x-axis-title="xAxisTitle" />
    `,
  }));
