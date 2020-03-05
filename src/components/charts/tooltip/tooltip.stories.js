import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { GlChart, GlChartTooltip } from '../../../../charts';
import readme from './tooltip.md';

const components = {
  GlChart,
  GlChartTooltip,
};

documentedStoriesOf('charts|chart-tooltip', readme).add('default', () => ({
  props: {},
  components,
  data() {
    return {
      chart: null,
      options: {},
      showTooltip: true,
      top: '50%',
      left: '0px',
    };
  },
  methods: {
    onCreated(chart) {
      this.chart = chart;
    },
  },
  template: `<div class="position-relative">
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
      <template #title>
        <div>
          Example Title
        </div>
      </template>
      Example Content
    </gl-chart-tooltip>
  </div>`,
}));
