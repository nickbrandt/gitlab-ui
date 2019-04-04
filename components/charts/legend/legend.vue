<script>
import GlChartSeriesLabel from '../series_label/series_label.vue';
import { average } from '../../../helpers/number_utils';
import { defaultFontSize } from '../../../helpers/charts/config';

export default {
  components: {
    GlChartSeriesLabel,
  },
  props: {
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
  computed: {
    fontStyle() {
      return {
        fontFamily: this.textStyle.fontFamily || 'sans-serif',
        fontSize: `${this.textStyle.fontSize || defaultFontSize}px`,
      };
    },
  },
  methods: {
    formatNumber(number) {
      return Number.isInteger(number) ? number : number.toFixed(3);
    },
    seriesAverage(seriesData) {
      return this.formatNumber(average(...seriesData));
    },
    seriesMax(seriesData) {
      return this.formatNumber(Math.max(...seriesData));
    },
  },
};
</script>

<template>
  <div class="d-flex flex-wrap flex-shrink-0">
    <div
      v-for="(series, key) in seriesInfo"
      :key="key"
      class="flex-shrink-0 d-flex append-right-8"
      :style="fontStyle"
    >
      <gl-chart-series-label
        :color="series.color"
        :type="series.type"
        class="append-right-8"
      >
        <strong>{{ series.name }}</strong>
      </gl-chart-series-label>
      <span v-if="series.data && series.data.length">Avg: {{
        seriesAverage(series.data)
      }} · Max: {{
        seriesMax(series.data)
      }}</span>
    </div>
  </div>
</template>
