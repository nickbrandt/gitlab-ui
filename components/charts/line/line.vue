<script>
import mergeWith from 'lodash/mergeWith';
import Chart from '../chart/chart.vue';
import ChartLegend from '../legend/legend.vue';
import ChartTooltip from '../tooltip/tooltip.vue';
import defaultChartOptions, {
  grid,
  getDataZoomConfig,
  getThresholdConfig,
  additiveArrayMerge,
  symbolSize,
  lineStyle,
} from '../../../helpers/charts/config';
import { debounceByAnimationFrame } from '../../../helpers/utils';
import { colorFromPalette } from '../../../helpers/charts/theme';
import { gray200 } from '../../../scss_to_js/scss_variables'; // eslint-disable-line import/no-unresolved

export default {
  components: {
    Chart,
    ChartLegend,
    ChartTooltip,
  },
  inheritAttrs: false,
  props: {
    data: {
      type: Array,
      required: true,
    },
    option: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    thresholds: {
      type: Array,
      required: false,
      default: () => [],
    },
    includeLegendAvgMax: {
      type: Boolean,
      required: false,
      default: true,
    },
    formatTooltipText: {
      type: Function,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      chart: null,
      showTooltip: false,
      tooltipTitle: '',
      tooltipContent: {},
      tooltipPosition: {
        left: '0',
        top: '0',
      },
      debouncedShowHideTooltip: debounceByAnimationFrame(this.showHideTooltip),
      selectedFormatTooltipText: this.formatTooltipText || this.defaultFormatTooltipText,
    };
  },
  computed: {
    series() {
      return this.data.map(series =>
        mergeWith(
          {
            type: 'line',
            showSymbol: true,
            symbol: 'circle',
          },
          symbolSize,
          lineStyle,
          series,
          this.thresholds === null ? {} : getThresholdConfig(this.thresholds),
          additiveArrayMerge
        )
      );
    },
    options() {
      return mergeWith(
        {},
        defaultChartOptions,
        {
          xAxis: {
            axisPointer: {
              show: true,
              label: {
                formatter: this.onLabelChange,
              },
            },
            axisTick: {
              alignWithLabel: true,
              show: true,
              lineStyle: {
                color: gray200,
              },
            },
          },
          series: this.series,
          legend: {
            show: false,
          },
        },
        this.dataZoomAdjustments,
        this.option,
        additiveArrayMerge
      );
    },
    dataZoomAdjustments() {
      const useSlider = !!this.option.dataZoom;

      return useSlider ? getDataZoomConfig() : {};
    },
    compiledOptions() {
      return this.chart ? this.chart.getOption() : null;
    },
    legendStyle() {
      return { paddingLeft: `${grid.left}px` };
    },
    seriesInfo() {
      return this.compiledOptions.series.reduce((acc, series, index) => {
        if (series.type === 'line') {
          acc.push({
            name: series.name,
            type: series.lineStyle.type,
            color: series.lineStyle.color || colorFromPalette(index),
            data: this.includeLegendAvgMax ? series.data.map(data => data[1]) : undefined,
          });
        }
        return acc;
      }, []);
    },
  },
  beforeDestroy() {
    this.chart.getDom().removeEventListener('mousemove', this.debouncedShowHideTooltip);
    this.chart.getDom().removeEventListener('mouseout', this.debouncedShowHideTooltip);
  },
  methods: {
    defaultFormatTooltipText(params) {
      const { xLabels, tooltipContent } = params.seriesData.reduce(
        (acc, line) => {
          const [title, value] = line.value;
          acc.tooltipContent[line.seriesName] = value;
          if (!acc.xLabels.includes(title)) {
            acc.xLabels.push(title);
          }
          return acc;
        },
        {
          xLabels: [],
          tooltipContent: {},
        }
      );
      this.$set(this, 'tooltipContent', tooltipContent);
      this.tooltipTitle = xLabels.join(', ');
    },
    onCreated(chart) {
      chart.getDom().addEventListener('mousemove', this.debouncedShowHideTooltip);
      chart.getDom().addEventListener('mouseout', this.debouncedShowHideTooltip);
      this.chart = chart;
      this.$emit('created', chart);
    },
    showHideTooltip(mouseEvent) {
      this.showTooltip = this.chart.containPixel('grid', [mouseEvent.zrX, mouseEvent.zrY]);
    },
    onUpdated(chart) {
      this.$emit('updated', chart);
    },
    onLabelChange(params) {
      this.selectedFormatTooltipText(params);
      if (params.seriesData.length) {
        const [left, top] = this.chart.convertToPixel('grid', params.seriesData[0].data);
        this.tooltipPosition = {
          left: `${left}px`,
          top: `${top}px`,
        };
      }
    },
  },
};
</script>

<template>
  <div class="position-relative">
    <chart
      v-bind="$attrs"
      :options="options"
      @created="onCreated"
      @updated="onUpdated"
    />
    <chart-tooltip
      v-if="chart"
      :show="showTooltip"
      :chart="chart"
      :top="tooltipPosition.top"
      :left="tooltipPosition.left"
    >
      <template v-if="formatTooltipText">
        <slot slot="title" name="tooltipTitle"></slot>
        <slot name="tooltipContent"></slot>
      </template>
      <template v-else>
        <div slot="title">
          {{ tooltipTitle }}
        </div>
        <div
          v-for="(value, label) in tooltipContent"
          :key="label + value"
        >
          {{ label }}
          {{ value }}
        </div>
      </template>
    </chart-tooltip>
    <chart-legend
      v-if="compiledOptions"
      :style="legendStyle"
      :series-info="seriesInfo"
      :text-style="compiledOptions.textStyle"
    />
  </div>
</template>
