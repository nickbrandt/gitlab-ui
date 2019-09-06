<script>
import echarts from 'echarts';
import GlChartSeriesLabel from '../series_label/series_label.vue';
import { average, engineeringNotation } from '../../../utils/number_utils';
import { defaultFontSize } from '../../../utils/charts/config';
import { gray200 } from '../../../scss_to_js/scss_variables'; // eslint-disable-line import/no-unresolved

export default {
  components: {
    GlChartSeriesLabel,
  },
  props: {
    chart: {
      type: Object,
      required: true,
      validator(chart) {
        return Object.is(chart, echarts.getInstanceByDom(chart.getDom()));
      },
    },
    seriesInfo: {
      type: Array,
      required: true,
      validator(seriesInfo) {
        return seriesInfo.every(series => series.type && series.name && series.color);
      },
    },
    textStyle: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  data() {
    return {
      disabledSeries: {},
    };
  },
  computed: {
    fontStyle() {
      return {
        fontFamily: this.textStyle.fontFamily || 'sans-serif',
        fontSize: `${this.textStyle.fontSize || defaultFontSize}px`,
      };
    },
  },
  methods: {
    seriesAverage(seriesData) {
      return engineeringNotation(average(...seriesData));
    },
    seriesMax(seriesData) {
      return engineeringNotation(Math.max(...seriesData));
    },
    handleClick(name, key) {
      this.chart.dispatchAction({ type: 'legendToggleSelect', name });
      this.disabledSeries = { ...this.disabledSeries, [key]: !this.disabledSeries[key] };
    },
    handleMouseEnter(name) {
      this.chart.dispatchAction({ type: 'highlight', seriesName: name });
    },
    handleMouseLeave(name) {
      this.chart.dispatchAction({ type: 'downplay', seriesName: name });
    },
    getColor(color, key) {
      return this.disabledSeries[key] ? gray200 : color;
    },
  },
};
</script>

<template>
  <div class="d-flex flex-wrap flex-shrink-0">
    <div
      v-for="(series, key) in seriesInfo"
      :key="key"
      :class="{ 'text-muted': disabledSeries[key] }"
      class="flex-shrink-0 d-flex append-right-8"
      :style="fontStyle"
      role="button"
      @click="handleClick(series.name, key)"
      @mouseenter="handleMouseEnter(series.name)"
      @mouseleave="handleMouseLeave(series.name)"
    >
      <gl-chart-series-label
        :color="getColor(series.color, key)"
        :type="series.type"
        class="append-right-8"
      >
        <strong>{{ series.name }}</strong>
      </gl-chart-series-label>
      <span v-if="series.data && series.data.length"
        >Avg: {{ seriesAverage(series.data) }} · Max: {{ seriesMax(series.data) }}</span
      >
    </div>
  </div>
</template>
