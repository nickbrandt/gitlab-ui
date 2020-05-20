import { withKnobs, object, boolean, array } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { GlLineChart } from '../../../../charts';
import readme from './line.md';
import { blue500, gray200 } from '../../../../scss_to_js/scss_variables'; // eslint-disable-line import/no-unresolved
import { timeSeriesDateFormatter } from '../../../utils/charts/utils';
import { generateTimeSeries } from '../../../utils/data_utils';
import { mockAnnotationsSeries, mockAnnotationsConfigs } from '../../../utils/charts/data';
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
  .add('with annotations as props (recommended)', () => ({
    props: generateProps({
      ...mockAnnotationsConfigs,
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
            formatter: timeSeriesDateFormatter,
          },
        },
      },
    }),
    components,
    template,
  }))
  .add('with annotations as option series', () => ({
    props: generateProps({
      data: [
        {
          name: 'Time Series',
          data: generateTimeSeries(),
        },
      ],
      option: {
        ...mockAnnotationsSeries,
        xAxis: {
          type: 'time',
          name: 'Time',
          axisLabel: {
            formatter: timeSeriesDateFormatter,
          },
        },
      },
    }),
    components,
    template,
  }))
  .add('with annotations as option series', () => ({
    props: generateProps({
      data: [
        {
          name: 'Time Series',
          data: generateTimeSeries(),
        },
      ],
      option: {
        series: [
          {
            type: 'scatter',
            name: 'annotations',
            data: [],
            markLine: {
              lineStyle: {
                color: blue500,
              },
              data: [
                { xAxis: '2018-01-25T01:00:00.000Z' },
                { xAxis: '2018-01-25T10:00:00.000Z' },
                { xAxis: '2018-02-06T08:00:00.000Z' },
              ],
            },
            markPoint: {
              symbol: 'path://m5 229 5 8h-10z',
              symbolSize: '8',
              symbolOffset: [0, ' 60%'],
              itemStyle: {
                color: blue500,
              },
              data: [
                {
                  name: 'annotations',
                  xAxis: '2018-01-25T01:00:00.000Z',
                  yAxis: 0,
                  tooltipData: { content: 'Scranton strangler was caught.' },
                },
                {
                  name: 'annotations',
                  xAxis: '2018-01-25T10:00:00.000Z',
                  yAxis: 0,
                  tooltipData: { content: 'Tobys green car is missing.' },
                },
                {
                  name: 'annotations',
                  xAxis: '2018-02-06T08:00:00.000Z',
                  yAxis: 0,
                  tooltipData: { content: 'It was actually Toby!' },
                },
              ],
            },
          },
        ],
        xAxis: {
          type: 'time',
          name: 'Time',
          axisLabel: {
            formatter: timeSeriesDateFormatter,
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
            formatter: timeSeriesDateFormatter,
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
