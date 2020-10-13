import { withKnobs, object, text } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { GlColumnChart } from '../../../../charts';
import { scrollHandleSvgPath } from '../../../utils/svgs/svg_paths';
import { toolbox } from '../../../utils/charts/story_config';
import readme from './column.md';
import { mockDefaultLineData, mockDefaultBarData } from '../../../utils/charts/mock_data';

const components = {
  GlColumnChart,
};

const template = `
  <gl-column-chart
    :bars="bars"
    :lines="lines"
    :option="option"
    :y-axis-title="yAxisTitle"
    :x-axis-title="xAxisTitle"
    :x-axis-type="xAxisType"
  />
`;

function generateProps({
  bars = mockDefaultBarData,
  lines = [],
  option = {},
  yAxisTitle = 'Pushes per day',
  xAxisTitle = 'User',
  xAxisType = 'category',
} = {}) {
  return {
    bars: {
      default: object('Chart Data', bars),
    },
    lines: {
      default: object('Line chart Data', lines),
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
  .add('with line series', () => ({
    props: generateProps({ lines: mockDefaultLineData }),
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
