import { withKnobs, object, array, boolean } from '@storybook/addon-knobs';
import documentedStoriesOf from '../utils/documented_stories';
import { GlAreaChart } from '../../charts';
import readme from '../../components/charts/area/area.md';

const components = {
  GlAreaChart,
};
const defaultData = [
  {
    name: 'First Series',
    data: [
      ['Mon', 1220],
      ['Tue', 932],
      ['Wed', 901],
      ['Thu', 934],
      ['Fri', 1290],
      ['Sat', 1330],
      ['Sun', 1320],
    ],
  },
];
const defaultOptions = {
  xAxis: {
    name: 'Time',
    type: 'category',
  },
};
const template = `<gl-area-chart
  :data="data"
  :option="option"
  :thresholds="thresholds"
/>`;

function generateData({
  data = defaultData,
  option = defaultOptions,
  thresholds = [],
  includeLegendAvgMax = true,
} = {}) {
  return {
    option: object('EChart Options', option),
    thresholds: array('Thresholds', thresholds),
    data: object('Chart Data', data),
    includeLegendAvgMax: boolean('Include Legend Avg Max', includeLegendAvgMax),
  };
}

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

function generateTimeSeries() {
  const timeSeries = [];
  for (let i = 0; i < 100; i += 1) {
    timeSeries.push([new Date(2018, 0, i), getRepeatingValue(i)]);
  }

  return timeSeries;
}

documentedStoriesOf('charts|area-chart', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    data() {
      return generateData();
    },
    components,
    template,
  }))
  .add('with threshold', () => ({
    data() {
      return generateData({
        thresholds: [{ threshold: 1200, operator: '>' }],
      });
    },
    components,
    template,
  }))
  .add('with zoom and scroll', () => ({
    data() {
      return generateData({
        data: [
          {
            name: 'Time Series',
            data: generateTimeSeries(),
          },
        ],
        option: {
          xAxis: {
            type: 'time',
            name: 'Time',
            axisLabel: {
              formatter: d => {
                const date = new Date(d);
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const day = date
                  .getDate()
                  .toString()
                  .padStart(2, '0');

                return `${date.getFullYear()}-${month}-${day}`;
              },
            },
          },
          dataZoom: {
            startValue: '2018-03-01T00:00:00.000',
            handleIcon: `path://m7 14c-3.86599325 0-7-3.1340068-7-7 0-3.86599325 3.13400675-7 7-7 3.8659932 0 7 3.13400675 7 7 0 3.8659932-3.1340068 7-7 7zm-2-11c-.55228475 0-1 .44771525-1 1v6c0 .5522847.44771525 1 1 1s1-.4477153 1-1v-6c0-.55228475-.44771525-1-1-1zm4 0c-.55228475 0-1 .44771525-1 1v6c0 .5522847.44771525 1 1 1s1-.4477153 1-1v-6c0-.55228475-.44771525-1-1-1z`,
          },
        },
      });
    },
    components,
    template,
  }));
