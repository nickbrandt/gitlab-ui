<script>
import merge from 'lodash/merge';
import Chart from '../chart/chart.vue';
import ChartTooltip from '../tooltip/tooltip.vue';

import defaultChartOptions, {
  mergeSeriesToOptions,
  symbolSize,
} from '../../../utils/charts/config';
import { debounceByAnimationFrame } from '../../../utils/utils';
import resizeObserver from '../../../directives/resize_observer/resize_observer';

import { sparkline } from '../../../utils/charts/theme';

const { variants, defaultVariant } = sparkline;
// the padding is needed so the mark points don't overflow when visible
const gridPadding = symbolSize / 2;

export default {
  components: { Chart, ChartTooltip },
  directives: {
    resizeObserver,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    tooltipLabel: {
      type: String,
      required: false,
      default: '',
    },
    height: {
      type: Number,
      required: false,
      default: 50,
    },
    variant: {
      type: String,
      required: false,
      default: defaultVariant,
      validator(value) {
        return Object.keys(variants).includes(value);
      },
    },
    showLastYValue: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      chartInstance: null,
      tooltip: {
        show: false,
        title: '',
        content: '',
        position: {
          left: '0',
          top: '0',
        },
      },
    };
  },
  computed: {
    options() {
      const sparkLineChartOptions = {
        grid: {
          top: gridPadding,
          bottom: gridPadding,
          left: gridPadding,
          right: gridPadding,
        },
        xAxis: {
          type: 'category',
          show: false,
          axisLabel: {
            show: true,
          },
          axisPointer: {
            show: true,
            type: 'none',
            label: {
              formatter: this.xAxisLabelFormatter,
            },
          },
        },
        yAxis: {
          type: 'value',
          show: false,
          min: 'datamin',
        },
      };
      const mergedOptions = merge({}, defaultChartOptions, sparkLineChartOptions);
      return mergeSeriesToOptions(mergedOptions, this.series);
    },
    series() {
      const { data } = this;
      return {
        type: 'line',
        symbol: 'circle',
        hoverAnimation: false,
        animation: true,
        cursor: 'auto',
        lineStyle: { color: this.variantColor },
        itemStyle: { color: this.variantColor },
        symbolSize,
        markPoint: {
          symbol: 'circle',
          cursor: 'auto',
          animation: false,
          symbolSize,
          data: [
            {
              xAxis: data.length - 1,
              yAxis: data[data.length - 1][1],
            },
          ],
        },
        data,
      };
    },
    lastYValue() {
      const latestEntry = this.data.slice(-1)[0];

      return latestEntry[1];
    },
    variantColor() {
      return variants[this.variant];
    },
  },
  created() {
    this.debouncedShowHideTooltip = debounceByAnimationFrame(this.showHideTooltip);
  },
  beforeDestroy() {
    this.chartInstance.getDom().removeEventListener('mousemove', this.debouncedShowHideTooltip);
  },
  methods: {
    onChartCreated(chartInstance) {
      this.chartInstance = chartInstance;
      this.chartInstance.getDom().addEventListener('mousemove', this.debouncedShowHideTooltip);
    },
    onComponentMouseLeave() {
      this.tooltip.show = false;
    },
    showHideTooltip(mouseEvent) {
      this.tooltip.show = this.chartInstance.containPixel('grid', [mouseEvent.zrX, mouseEvent.zrY]);
    },
    handleResize() {
      this.chartInstance.resize();
    },
    formatTooltipText([xValue, yValue]) {
      this.tooltip.title = xValue;
      this.tooltip.content = yValue;
    },
    setTooltipPosition(data) {
      const [left, top] = this.chartInstance.convertToPixel('grid', data);
      this.tooltip.position = {
        left: `${left}px`,
        top: `${top}px`,
      };
    },
    xAxisLabelFormatter({ seriesData = [] }) {
      // seriesData is an array of nearby data point coordinates
      // seriesData[0] is the nearest point at which the tooltip is displayed
      // https://echarts.apache.org/en/option.html#xAxis.axisPointer.label.formatter
      const [firstDataPoint] = seriesData;

      if (firstDataPoint && firstDataPoint.data) {
        const { data } = firstDataPoint;

        this.formatTooltipText(data);
        this.setTooltipPosition(data);
      }
    },
  },
};
</script>

<template>
  <div
    v-resize-observer="handleResize"
    class="d-flex align-items-center"
    @mouseleave="onComponentMouseLeave"
  >
    <slot name="default"></slot>
    <div class="flex-grow-1 position-relative">
      <chart :height="height" :options="options" @created="onChartCreated" />
      <chart-tooltip
        v-if="chartInstance"
        :show="tooltip.show"
        :chart="chartInstance"
        :top="tooltip.position.top"
        :left="tooltip.position.left"
        :style="{ pointerEvents: 'none' }"
        placement="top"
      >
        <template>
          <div slot="title" class="js-tooltip-title text-nowrap">{{ tooltip.title }}</div>
          <div slot="default" class="js-tooltip-content text-nowrap">
            <span v-if="tooltipLabel" class="d-inline-block mr-4">{{ tooltipLabel }}</span>
            <strong>{{ tooltip.content }}</strong>
          </div>
        </template>
      </chart-tooltip>
    </div>
    <span v-if="showLastYValue" class="js-last-y-value d-inline-flex justify-content-center ml-3">{{
      lastYValue
    }}</span>
  </div>
</template>
