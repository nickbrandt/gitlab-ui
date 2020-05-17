<script>
import echarts from 'echarts';
import GlChartSeriesLabel from '../series_label/series_label.vue';
import GlTooltip from '../../base/tooltip/tooltip.vue';
import { average, engineeringNotation } from '../../../utils/number_utils';
import { defaultFontSize } from '../../../utils/charts/config';
import { gray200 } from '../../../../scss_to_js/scss_variables'; // eslint-disable-line import/no-unresolved
import {
  LEGEND_LAYOUT_INLINE,
  LEGEND_LAYOUT_TABLE,
  LEGEND_AVERAGE_TEXT,
  LEGEND_CURRENT_TEXT,
  LEGEND_MIN_TEXT,
  LEGEND_MAX_TEXT,
} from '../../../utils/charts/constants';

export default {
  components: {
    GlChartSeriesLabel,
    GlTooltip,
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
    averageText: {
      type: String,
      required: false,
      default: LEGEND_AVERAGE_TEXT,
    },
    currentText: {
      type: String,
      required: false,
      default: LEGEND_CURRENT_TEXT,
    },
    minText: {
      type: String,
      required: false,
      default: LEGEND_MIN_TEXT,
    },
    maxText: {
      type: String,
      required: false,
      default: LEGEND_MAX_TEXT,
    },
    layout: {
      type: String,
      required: false,
      default: LEGEND_LAYOUT_INLINE,
      validator(layout) {
        return [LEGEND_LAYOUT_INLINE, LEGEND_LAYOUT_TABLE].indexOf(layout) !== -1;
      },
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
    seriesMin(seriesData) {
      return engineeringNotation(Math.min(...seriesData));
    },
    seriesLast(seriesData) {
      return engineeringNotation(seriesData[seriesData.length - 1]);
    },
    seriesNameIsLong(seriesName) {
      return seriesName.length > 120;
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
  <div>
    <template v-if="layout === 'inline'">
      <div class="gl-legend-inline" data-testid="chart-legend">
        <div
          v-for="(series, key) in seriesInfo"
          :key="key"
          :class="{ 'text-muted': disabledSeries[key], 'w-100': seriesNameIsLong(series.name) }"
          class="gl-legend-inline-series"
          :style="fontStyle"
          role="button"
          @click="handleClick(series.name, key)"
          @mouseenter="handleMouseEnter(series.name)"
          @mouseleave="handleMouseLeave(series.name)"
        >
          <gl-chart-series-label
            :color="getColor(series.color, key)"
            :type="series.type"
            class="gl-legend-inline-series-label"
            :class="{ 'w-75': seriesNameIsLong(series.name) }"
          >
            <strong>{{ series.name }}</strong>
          </gl-chart-series-label>
          <span
            v-if="series.data && series.data.length"
            :class="{ 'w-100 gl-white-space-nowrap': seriesNameIsLong(series.name) }"
          >
            {{ averageText }}: {{ seriesAverage(series.data) }} · {{ maxText }}:
            {{ seriesMax(series.data) }}
          </span>
        </div>
      </div>
    </template>

    <template v-if="layout === 'table'">
      <div class="gl-legend-tabular" :style="fontStyle">
        <header class="gl-legend-tabular-header">
          <div class="gl-legend-tabular-header-cell">{{ minText }}</div>
          <div class="gl-legend-tabular-header-cell">{{ maxText }}</div>
          <div class="gl-legend-tabular-header-cell">{{ averageText }}</div>
          <div class="gl-legend-tabular-header-cell">{{ currentText }}</div>
        </header>
        <section class="gl-legend-tabular-body">
          <div
            v-for="(series, key) in seriesInfo"
            :key="key"
            :class="{ 'text-muted': disabledSeries[key] }"
            class="gl-legend-tabular-row"
            :style="fontStyle"
            role="button"
            @click="handleClick(series.name, key)"
            @mouseenter="handleMouseEnter(series.name)"
            @mouseleave="handleMouseLeave(series.name)"
          >
            <div :id="`gl-chart-label-${key}`" class="gl-legend-tabular-title-cell">
              <gl-chart-series-label
                :color="getColor(series.color, key)"
                :style="fontStyle"
                :type="series.type"
              >
                <strong>{{ series.name }}</strong>
              </gl-chart-series-label>
            </div>

            <gl-tooltip :target="`gl-chart-label-${key}`" boundary="viewport">{{
              series.name
            }}</gl-tooltip>

            <template v-if="series.data && series.data.length">
              <div class="gl-legend-tabular-details-cell">{{ seriesMin(series.data) }}</div>
              <div class="gl-legend-tabular-details-cell">{{ seriesMax(series.data) }}</div>
              <div class="gl-legend-tabular-details-cell">{{ seriesAverage(series.data) }}</div>
              <div class="gl-legend-tabular-details-cell">{{ seriesLast(series.data) }}</div>
            </template>
            <template v-else>
              <div class="gl-legend-tabular-details-cell">-</div>
              <div class="gl-legend-tabular-details-cell">-</div>
              <div class="gl-legend-tabular-details-cell">-</div>
              <div class="gl-legend-tabular-details-cell">-</div>
            </template>
          </div>
        </section>
      </div>
    </template>
  </div>
</template>
