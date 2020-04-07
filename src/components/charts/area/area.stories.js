import { withKnobs, object, array, boolean } from '@storybook/addon-knobs';
import { times } from 'lodash';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { GlAreaChart } from '../../../../charts';
import readme from './area.md';
import { generateTimeSeries } from '../../../utils/data_utils';
import { timeSeriesDateFormatter } from '../../../utils/charts/utils';
import { scrollHandleSvgPath } from '../../../utils/svgs/svg_paths';
import { toolbox } from '../../../utils/charts/story_config';

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
    option: {
      default: object('EChart Options', option),
    },
    thresholds: {
      default: array('Thresholds', thresholds),
    },
    annotations: {
      default: array('Annotations', annotations),
    },
    data: {
      default: object('Chart Data', data),
    },
    includeLegendAvgMax: {
      default: boolean('Include Legend Avg Max', includeLegendAvgMax),
    },
  };
}

documentedStoriesOf('charts|area-chart', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    components,
    template,
  }))
  .add('with threshold', () => ({
    props: generateProps({
      thresholds: [{ threshold: 1200, operator: '>' }],
    }),
    components,
    template,
  }))
  .add('with annotations', () => ({
    props: generateProps({
      annotations: [
        { min: '2018-01-25T01:00:00.000Z', max: '2018-01-25T01:00:00.000Z' },
        { min: '2018-01-25T10:00:00.000Z', max: '2018-01-25T10:00:00.000Z' },
        { min: '2018-02-06T08:00:00.000Z', max: '2018-02-06T08:00:00.000Z' },
      ],
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
            markPoint: {
              symbol: 'path://m5 229 5 8h-10z',
              symbolSize: '8',
              symbolOffset: [0, ' 60%'],
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
            startValue: '2018-03-01T00:00:00.000',
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
        xAxis: {
          name: 'Time',
          type: 'category',
        },
        toolbox,
      },
    }),
    components,
    template,
  }))
  .add('mult-series', () => ({
    props: generateProps({
      data: times(10, index => ({
        name: index,
        data: defaultData[0].data.map(([label, value]) => [label, value * index]),
      })),
    }),
    components,
    template,
  }));
