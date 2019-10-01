import { withKnobs, object, text } from '@storybook/addon-knobs';
import documentedStoriesOf from '../../../utils/documented_stories';
import { GlColumnChart } from '../../../charts';
import { scrollHandleSvgPath } from '../../../utils/svgs/svg_paths';
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
  option = {},
  yAxisTitle = 'Pushes per day',
  xAxisTitle = 'Username',
  xAxisType = 'category',
} = {}) {
  return {
    data: {
      default: object('Chart Data', data),
    },
    option: {
      default: object('Echart Options', option),
    },
    yAxisTitle: {
      default: text('Y Axis Title', yAxisTitle),
    },
    xAxisTitle: {
      default: text('X Axis Title', xAxisTitle),
    },
    xAxisType: {
      default: text('X Axis Type', xAxisType),
    },
  };
}

documentedStoriesOf('charts|column-chart', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    components,
    template,
  }))
  .add('with zoom and scroll', () => ({
    props: generateProps({
      option: {
        dataZoom: [
          {
            type: 'slider',
            startValue: 1,
            handleIcon: scrollHandleSvgPath,
          },
        ],
      },
    }),
    components,
    template,
  }))
  .add('with toolbox', () => ({
    props: generateProps({
      option: {
        toolbox,
      },
    }),
    components,
    template,
  }));
