import { withKnobs, object, array, boolean } from '@storybook/addon-knobs';
import { times } from 'lodash';
import documentedStoriesOf from '../../../utils/documented_stories';
import { GlAreaChart } from '../../../../charts';
import readme from './area.md';
import { generateTimeSeries } from '../../../utils/data_utils';
import { getSvgEchartsPath } from '../../../utils/svg_utils';
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
  :includeLegendAvgMax="includeLegendAvgMax"
/>`;

function generateProps({
  data = defaultData,
  option = defaultOptions,
  thresholds = [],
  includeLegendAvgMax = true,
} = {}) {
  return {
    option: {
      default: object('EChart Options', option),
    },
    thresholds: {
      default: array('Thresholds', thresholds),
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
            startValue: '2018-03-01T00:00:00.000',
            handleIcon: getSvgEchartsPath('scroll-handle'),
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
