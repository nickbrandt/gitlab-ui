import { withKnobs, object, text } from '@storybook/addon-knobs';
import documentedStoriesOf from '../utils/documented_stories';
import { GlColumnChart } from '../../charts';
import readme from '../../components/charts/column/column.md';

const components = {
  GlColumnChart,
};

const template = `<gl-column-chart 
  :data="data"
  :option="option"
  :y-axis-title="yAxisTitle"
  :x-axis-title="xAxisTitle" 
/>`;

const defaultData = {
  Full: [
    ['Mon', 1220],
    ['Tue', 932],
    ['Wed', 901],
    ['Thu', 934],
    ['Fri', 1290],
    ['Sat', 1330],
    ['Sun', 1320],
  ],
};

function getRepeatingValue(index) {
  const values = [
    100,
    500,
    400,
    200,
    100,
    800,
    400,
    500,
    600,
    300,
    800,
    900,
    110,
    700,
    400,
    300,
    500,
    300,
    400,
    600,
    700,
  ];
  let i = index;
  while (i >= values.length) {
    i -= values.length;
  }

  return values[i];
}

function generateRandomMonthData() {
  const data = [];
  for (let i = 1; i <= 30; i += 1) {
    data.push([i, getRepeatingValue(i)]);
  }

  return data;
}

function generateProps({
  data = defaultData,
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
    template,
  }))
  .add('with zoom and scroll', () => ({
    props: generateProps({
      data: {
        Full: generateRandomMonthData(),
      },
      option: {
        dataZoom: {
          startValue: 1,
          handleIcon: `path://m7 14c-3.86599325 0-7-3.1340068-7-7 0-3.86599325 3.13400675-7 7-7 3.8659932 0 7 3.13400675 7 7 0 3.8659932-3.1340068 7-7 7zm-2-11c-.55228475 0-1 .44771525-1 1v6c0 .5522847.44771525 1 1 1s1-.4477153 1-1v-6c0-.55228475-.44771525-1-1-1zm4 0c-.55228475 0-1 .44771525-1 1v6c0 .5522847.44771525 1 1 1s1-.4477153 1-1v-6c0-.55228475-.44771525-1-1-1z`,
        },
      },
    }),
    components,
    template,
  }));
