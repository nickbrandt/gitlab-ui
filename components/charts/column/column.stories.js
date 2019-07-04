import { withKnobs, object, text } from '@storybook/addon-knobs';
import documentedStoriesOf from '../../../utils/documented_stories';
import { GlColumnChart } from '../../../charts';
import { getSvgEchartsPath } from '../../../utils/svg_utils';
import { toolbox } from '../../../utils/charts/story_config';
import readme from './column.md';

const components = {
  GlColumnChart,
};

const template = `
  <gl-column-chart
    :data="data"
    :option="option"
    :y-axis-title="yAxisTitle"
    :x-axis-title="xAxisTitle"
    :x-axis-type="xAxisType"
  />
`;

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
    template,
  }))
  .add('with zoom and scroll', () => ({
    data() {
      return generateData({
        option: {
          dataZoom: [
            {
              type: 'slider',
              startValue: 1,
              handleIcon: getSvgEchartsPath('scroll-handle'),
            },
          ],
        },
      });
    },
    components,
    template,
  }))
  .add('with toolbox', () => ({
    data() {
      return generateData({
        option: {
          toolbox,
        },
      });
    },
    components,
    template,
  }));
