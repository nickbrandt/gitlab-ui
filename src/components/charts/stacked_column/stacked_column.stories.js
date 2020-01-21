import { withKnobs, object, text, array, select } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { GlStackedColumnChart } from '../../../../charts';
import readme from './stacked_column.md';
import { columnOptions } from '../../../utils/constants';
import { scrollHandleSvgPath } from '../../../utils/svgs/svg_paths';
import { toolbox } from '../../../utils/charts/story_config';

const components = {
  GlStackedColumnChart,
};

const template = `
  <gl-stacked-column-chart
    :data="data"
    :option="option"
    :presentation="presentation"
    :group-by="groupBy"
    :x-axis-type="xAxisType"
    :x-axis-title="xAxisTitle"
    :y-axis-title="yAxisTitle"
    :series-names="seriesNames"
  />
`;

function generateProps({
  data = [
    [58, 49, 38, 23, 27, 68, 38, 35, 7, 64, 65, 31],
    [8, 6, 34, 19, 9, 7, 17, 25, 14, 7, 10, 32],
    [67, 60, 66, 32, 61, 54, 13, 50, 16, 11, 47, 28],
    [8, 9, 5, 40, 13, 19, 58, 21, 47, 59, 23, 46],
  ],
  option = {},
  groupBy = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  xAxisType = 'category',
  xAxisTitle = 'January - December 2018',
  yAxisTitle = 'Commits',
  seriesNames = ['Fun 1', 'Fun 2', 'Fun 3', 'Fun 4'],
  presentation = columnOptions.stacked,
} = {}) {
  return {
    data: {
      default: object('Chart Data', data),
    },
    option: {
      default: object('Echart Options', option),
    },
    presentation: {
      default: select('presentation', columnOptions, presentation),
    },
    groupBy: {
      default: array('Group By', groupBy),
    },
    xAxisType: {
      default: text('X Axis Type', xAxisType),
    },
    xAxisTitle: {
      default: text('X Axis Title', xAxisTitle),
    },
    yAxisTitle: {
      default: text('Y Axis Title', yAxisTitle),
    },
    seriesNames: {
      default: array('Series Names', seriesNames),
    },
  };
}

documentedStoriesOf('charts|stacked-column-chart', readme)
  .addDecorator(withKnobs)
  .add('stacked', () => ({
    props: generateProps(),
    components,
    template,
  }))
  .add('tiled', () => ({
    props: generateProps({ presentation: columnOptions.tiled }),
    components,
    template,
  }))
  .add('with zoom and scroll', () => ({
    props: generateProps({
      option: {
        dataZoom: [
          {
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
