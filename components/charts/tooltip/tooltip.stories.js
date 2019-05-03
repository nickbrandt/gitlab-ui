import documentedStoriesOf from '../../../utils/documented_stories';
import { GlChart, GlChartTooltip } from '../../../charts';
import readme from './tooltip.md';

const components = {
  GlChart,
  GlChartTooltip,
};

const defaultData = {
  chart: null,
  options: {},
  showTooltip: true,
  top: '50%',
  left: '0px',
};

const defaultTemplate = `<div class="position-relative">
<gl-chart
  :options="options"
  :height="100"
  @created="onCreated"
/>
<gl-chart-tooltip
  v-if="chart"
  :chart="chart"
  :show="showTooltip"
  :top="top"
  :left="left"
>
  <div slot="title">
    Example Title
  </div>
  Example Content
</gl-chart-tooltip>
</div>`;

const withContentTemplate = `<div class="position-relative">
<gl-chart
  :options="options"
  :height="100"
  @created="onCreated"
/>
<gl-chart-tooltip
  v-if="chart"
  :chart="chart"
  :show="showTooltip"
  :top="top"
  :left="left"
>
  <div slot="title">
    Example Title
  </div>
  <gl-content-from-data :tooltip-content="tooltipContent"/>
</gl-chart-tooltip>
</div>`;

documentedStoriesOf('charts|chart-tooltip', readme)
  .add('default', () => ({
    props: {},
    components,
    data() {
      return defaultData;
    },
    methods: {
      onCreated(chart) {
        this.chart = chart;
      },
    },
    template: defaultTemplate,
  }))
  .add('with content', () => ({
    props: {},
    components,
    data() {
      return {
        ...defaultData,
        tooltipContent: {
          'Series 1': {
            index: 0,
            value: 5,
          },
          'Series 2': {
            index: 1,
            value: 10,
          },
        },
      };
    },
    methods: {
      onCreated(chart) {
        this.chart = chart;
      },
    },
    template: withContentTemplate,
  }));
