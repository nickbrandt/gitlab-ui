import documentedStoriesOf from '../../../utils/documented_stories';
import { GlChart, GlChartLegend } from '../../../charts';
import readme from './legend.md';

const components = {
  GlChart,
  GlChartLegend,
};

const options = {
  legend: {
    show: false,
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      color: '#1F78D1',
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      name: 'Series Name',
      showSymbol: true,
      type: 'line',
    },
  ],
};

const seriesInfo = options.series.map(series => ({
  type: 'solid',
  name: series.name,
  color: series.color,
}));

documentedStoriesOf('charts|chart-legend', readme).add('default', () => ({
  props: {},
  components,
  options,
  seriesInfo,
  data() {
    return {
      chart: null,
    };
  },
  methods: {
    onCreated(chart) {
      this.chart = chart;
    },
  },
  template: `<div>
    <gl-chart
      :options="$options.options"
      @created="onCreated"
    />
    <gl-chart-legend
      v-if="chart"
      :chart="chart"
      :series-info="$options.seriesInfo"
    />
  </div>`,
}));
