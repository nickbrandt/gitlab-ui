import { withKnobs, object, boolean, array } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { GlLineChart } from '../../../../charts';
import readme from './line.md';
import { gray200 } from '../../../../scss_to_js/scss_variables'; // eslint-disable-line import/no-unresolved
import { generateTimeSeries } from '../../../utils/data_utils';
import { scrollHandleSvgPath } from '../../../utils/svgs/svg_paths';
import { toolbox } from '../../../utils/charts/story_config';

const components = {
  GlLineChart,
};
const defaultData = [
  {
    name: 'Requested',
    data: [
      ['Mon', 1184],
      ['Tue', 1346],
      ['Wed', 1035],
      ['Thu', 1226],
      ['Fri', 1421],
      ['Sat', 1347],
      ['Sun', 1035],
    ],
  },
  {
    name: 'Actual',
    data: [
      ['Mon', 1509],
      ['Tue', 1275],
      ['Wed', 1187],
      ['Thu', 1287],
      ['Fri', 1098],
      ['Sat', 1457],
      ['Sun', 1452],
    ],
  },
  {
    name: 'Predicted',
    data: [
      ['Mon', 1041],
      ['Tue', 1468],
      ['Wed', 1273],
      ['Thu', 1503],
      ['Fri', 1209],
      ['Sat', 1416],
      ['Sun', 1213],
    ],
  },
];
const defaultOptions = {
  xAxis: {
    name: 'Time',
    type: 'category',
  },
};

const template = `<gl-line-chart
  :data="data"
  :option="option"
  :thresholds="thresholds"
  :annotations="annotations"
  :includeLegendAvgMax="includeLegendAvgMax"
/>`;

function generateProps({
  data = defaultData,
  option = defaultOptions,
  thresholds = [],
  annotations = [],
  includeLegendAvgMax = true,
} = {}) {
  return {
    includeLegendAvgMax: {
      default: boolean('Include Legend Avg Max', includeLegendAvgMax),
    },
    option: {
      default: object('EChart Options', option),
    },
    thresholds: {
      default: object('Thresholds', thresholds),
    },
    annotations: {
      default: array('Annotations', annotations),
    },
    data: {
      default: object('Chart Data', data),
    },
  };
}

documentedStoriesOf('charts|line-chart', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    components,
    template,
  }))
  .add('with threshold', () => ({
    props: generateProps({
      thresholds: [{ threshold: 1350, operator: '>' }],
    }),
    components,
    template,
  }))
  .add('with annotations', () => ({
    props: generateProps({
      annotations: [
        { min: '2018-01-15T08:00:00.000Z', max: '2018-01-15T08:00:00.000Z' },
        { min: '2018-01-16T08:00:00.000Z', max: '2018-01-16T08:00:00.000Z' },
      ],
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
      },
    }),
    components,
    template,
  }))
  .add('with zoom and scroll', () => ({
    props: generateProps({
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
        dataZoom: [
          {
            type: 'slider',
            startValue: '2018-03-01T00:00:00.000',
            handleIcon: scrollHandleSvgPath,
            dataBackground: {
              lineStyle: {
                width: 2,
                color: gray200,
              },
              areaStyle: null,
            },
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
        xAxis: {
          name: 'Time',
          type: 'category',
        },
        toolbox,
      },
    }),
    components,
    template,
  }));
