import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { GlChart, GlChartLegend } from '../../../../charts';
import { generateSeriesData } from '../../../utils/charts/story_config';
import readme from './legend.md';

const series = generateSeriesData(10);

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
  series: series.map(data => ({
    color: data.color,
    data: data.data,
    name: data.name,
    showSymbol: true,
    type: 'line',
  })),
};

const seriesInfo = series.map(item => ({
  type: 'solid',
  name: item.name,
  color: item.color,
  data: item.data,
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
