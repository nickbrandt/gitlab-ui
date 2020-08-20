import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { GlChart, GlChartLegend } from '../../../../charts';
import { generateSeriesData } from '../../../utils/charts/story_config';
import readme from './legend.md';

const generateOptions = (seriesLength, seriesNameType) => {
  return {
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
    series: generateSeriesData(seriesLength, seriesNameType).map(data => ({
      color: data.color,
      data: data.data,
      name: data.name,
      showSymbol: true,
      type: 'line',
    })),
  };
};

const generateSeriesInfo = (amount, nameType) => {
  const seriesData = generateSeriesData(amount, nameType);

  return seriesData.map(item => ({
    type: 'solid',
    name: item.name,
    color: item.color,
    data: item.data,
  }));
};

const generateTemplate = type => {
  const layoutTypeAttribute = type === 'table' ? `:layout="'table'"` : '';

  return `<div>
    <gl-chart
      :options="$options.options"
      @created="onCreated"
    />
    <gl-chart-legend
      v-if="chart"
      ${layoutTypeAttribute}
      :chart="chart"
      :series-info="$options.seriesInfo"
    />
  </div>`;
};

const components = {
  GlChart,
  GlChartLegend,
};

const baseStoryOptions = {
  props: {},
  components,
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
};

const getStoryOptions = (seriesLength, seriesNameType, legendLayoutType) => {
  return {
    ...baseStoryOptions,
    options: generateOptions(seriesLength, seriesNameType),
    seriesInfo: generateSeriesInfo(seriesLength, seriesNameType),
    template: legendLayoutType ? generateTemplate(legendLayoutType) : generateTemplate(),
  };
};

documentedStoriesOf('charts|chart-legend', readme)
  .add('default', () => getStoryOptions(10, 'short'))
  .add('default with long series names', () => getStoryOptions(10, 'long'))
  .add('default with long series names and no spaces', () => getStoryOptions(10, 'long-no-spaces'))
  .add('with tabular layout', () => getStoryOptions(10, 'short', 'table'))
  .add('with tabular layout and long series names', () => getStoryOptions(10, 'long', 'table'))
  .add('with tabular layout and long series names with no spaces', () =>
    getStoryOptions(10, 'long-no-spaces', 'table')
  );
