import { withKnobs, object, text } from '@storybook/addon-knobs';
import documentedStoriesOf from '../utils/documented_stories';
import { GlColumnChart } from '../../charts';
import readme from '../../components/charts/column/column.md';

const components = {
  GlColumnChart,
};

function generateData({
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
  option = {},
  yAxisTitle = 'Pushes per day',
  xAxisTitle = 'Username',
  xAxisType = 'category',
} = {}) {
  return {
    data: object('Chart Data', data),
    option: object('Echart Options', option),
    yAxisTitle: text('Y Axis Title', yAxisTitle),
    xAxisTitle: text('X Axis Title', xAxisTitle),
    xAxisType: text('X Axis Type', xAxisType),
  };
}

documentedStoriesOf('charts|column-chart', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    data() {
      return generateData();
    },
    components,
    template: `
      <gl-column-chart :data="data" :option="option" :y-axis-title="yAxisTitle" :x-axis-title="xAxisTitle" :x-axis-type="xAxisType" />
    `,
  }));
