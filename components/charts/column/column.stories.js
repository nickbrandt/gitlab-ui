import { withKnobs, object, text } from '@storybook/addon-knobs';
import documentedStoriesOf from '../../../utils/documented_stories';
import { GlColumnChart } from '../../../charts';
import { getSvgEchartsPath } from '../../../utils/svg_utils';
import { toolbox } from '../../../utils/charts/story_config';
import readme from './column.md';

const components = {
  GlColumnChart,
};

const template = `
  <gl-column-chart
    :data="data"
    :option="option"
    :y-axis-title="yAxisTitle"
    :x-axis-title="xAxisTitle"
    :x-axis-type="xAxisType"
  />
`;

function generateProps({
  data = {
    Full: [
      ['Mon', 1220],
      ['Tue', 932],
      ['Wed', 901],
      ['Thu', 934],
      ['Fri', 1290],
      ['Sat', 1330],
      ['Sun', 1320],
    ],
  },
  option = {},
  yAxisTitle = 'Pushes per day',
  xAxisTitle = 'Username',
  xAxisType = 'category',
} = {}) {
  return {
    data: {
      default: object('Chart Data', data),
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
  .add('with zoom and scroll', () => ({
    props: generateProps({
      option: {
        dataZoom: [
          {
            type: 'slider',
            startValue: 1,
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
        toolbox,
      },
    }),
    components,
    template,
  }))
  .add('with custom tooltip', () => ({
    props: generateProps(),
    components,
    data() {
      return {
        tooltipTitle: '',
        tooltipContent: '',
      };
    },
    methods: {
      customTooltipFormatter(params) {
        const { value: label, seriesData } = params;
        const { data } = seriesData[0];
        const [, value] = data;
        this.tooltipTitle = label;
        this.tooltipContent = `This is my value: ${value}`;
      },
    },
    template: `
      <gl-column-chart
        :data="data"
        :option="option"
        :custom-tooltip-formatter="customTooltipFormatter"
        :y-axis-title="yAxisTitle"
        :x-axis-title="xAxisTitle"
        :x-axis-type="xAxisType">
          <template slot="tooltipTitle">{{ tooltipTitle }}</template>
          <template slot="tooltipContent">{{ tooltipContent }}</template>
      </gl-column-chart>
    `,
  }));
