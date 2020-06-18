import { withKnobs, object, array, boolean } from '@storybook/addon-knobs';
import { times } from 'lodash';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { GlAreaChart, GlChartLegend } from '../../../../charts';
import readme from './area.md';
import { blue500 } from '../../../../scss_to_js/scss_variables'; // eslint-disable-line import/no-unresolved
import { generateTimeSeries } from '../../../utils/data_utils';
import { mockAnnotationsSeries, mockAnnotationsConfigs } from '../../../utils/charts/data';
import { timeSeriesDateFormatter } from '../../../utils/charts/utils';
import { scrollHandleSvgPath } from '../../../utils/svgs/svg_paths';
import { toolbox } from '../../../utils/charts/story_config';

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
      default: object('Annotations', annotations),
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
    components: { GlAreaChart },
    template,
  }))
  .add('with threshold', () => ({
    props: generateProps({
      thresholds: [{ threshold: 1200, operator: '>' }],
    }),
    components: { GlAreaChart },
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
    components: { GlAreaChart },
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
    components: { GlAreaChart },
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
    components: { GlAreaChart },
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
    components: { GlAreaChart },
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
    components: { GlAreaChart },
    template,
  }))
  .add('multi-series', () => ({
    props: generateProps({
      data: times(10, index => ({
        name: index,
        data: defaultData[0].data.map(([label, value]) => [label, value * index]),
      })),
    }),
    components: { GlAreaChart },
    template,
  }))
  .add('grouped with zoom and scroll', () => ({
    props: generateProps({
      // TODO - add group ID here, to be dynamic
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
    components: { GlAreaChart, GlChartLegend },
    template: `
    <div>
      <gl-area-chart
      :group-id="'groupId'"
      :data="data"
      :option="option"
      :thresholds="thresholds"
      :annotations="annotations"
      :includeLegendAvgMax="includeLegendAvgMax"
      />
      <gl-area-chart
      :group-id="'groupId'"
      :data="data"
      :option="option"
      :thresholds="thresholds"
      :annotations="annotations"
      :includeLegendAvgMax="includeLegendAvgMax"
      />
    </div>`,
  }));
