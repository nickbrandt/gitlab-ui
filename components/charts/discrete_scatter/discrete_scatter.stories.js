import { withKnobs, object, text } from '@storybook/addon-knobs';
import documentedStoriesOf from '../../../utils/documented_stories';
import { GlDiscreteScatterChart } from '../../../charts';
import readme from './discrete_scatter.md';

const components = {
  GlDiscreteScatterChart,
};

const template = `
  <gl-discrete-scatter-chart
    :data="data"
    :option="option"
    :y-axis-title="yAxisTitle"
    :x-axis-title="xAxisTitle"
  />
`;

function generateData({
  data = [
    {
      type: 'scatter',
      data: [
        ['19 May', 6.95],
        ['20 May', 7.58],
        ['21 May', 8.81],
        ['22 May', 8.33],
        ['23 May', 9.96],
        ['24 May', 7.24],
        ['25 May', 4.26],
      ],
    },
  ],
  option = {},
  yAxisTitle = 'Pushes per day',
  xAxisTitle = 'Date',
} = {}) {
  return {
    data: object('Chart Data', data),
    option: object('EChart Options', option),
    yAxisTitle: text('Y Axis Title', yAxisTitle),
    xAxisTitle: text('X Axis Title', xAxisTitle),
  };
}

documentedStoriesOf('charts|discrete-scatter-chart', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    data() {
      return generateData();
    },
    components,
    template,
  }));
