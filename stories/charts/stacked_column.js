import { withKnobs, object, text, array, select } from '@storybook/addon-knobs';
import documentedStoriesOf from '../utils/documented_stories';
import { GlStackedColumnChart } from '../../charts';
import readme from '../../components/charts/stacked_column/stacked_column.md';
import { columnOptions } from '../utils/constants';

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

function generateData({
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
    data: array('Chart Data', data),
    option: object('Echart Options', option),
    presentation: select('presentation', columnOptions, presentation),
    groupBy: array('Group By', groupBy),
    xAxisType: text('X Axis Type', xAxisType),
    xAxisTitle: text('X Axis Title', xAxisTitle),
    yAxisTitle: text('Y Axis Title', yAxisTitle),
    seriesNames: array('Series Names', seriesNames),
  };
}

documentedStoriesOf('charts|stacked-column-chart', readme)
  .addDecorator(withKnobs)
  .add('stacked', () => ({
    data() {
      return generateData();
    },
    components,
    template,
  }))
  .add('tiled', () => ({
    data() {
      return generateData({ presentation: columnOptions.tiled });
    },
    components,
    template,
  }))
  .add('with zoom and scroll', () => ({
    data() {
      return generateData({
        option: {
          dataZoom: {
            startValue: 1,
            handleIcon: `path://m7 14c-3.86599325 0-7-3.1340068-7-7 0-3.86599325 3.13400675-7 7-7 3.8659932 0 7 3.13400675 7 7 0 3.8659932-3.1340068 7-7 7zm-2-11c-.55228475 0-1 .44771525-1 1v6c0 .5522847.44771525 1 1 1s1-.4477153 1-1v-6c0-.55228475-.44771525-1-1-1zm4 0c-.55228475 0-1 .44771525-1 1v6c0 .5522847.44771525 1 1 1s1-.4477153 1-1v-6c0-.55228475-.44771525-1-1-1z`,
          },
        },
      });
    },
    components,
    template,
  }));
