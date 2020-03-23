<script>
import merge from 'lodash/merge';
import Chart from '../chart/chart.vue';
import ChartLegend from '../legend/legend.vue';
import ChartTooltip from '../tooltip/tooltip.vue';
import ToolboxMixin from '../../mixins/toolbox_mixin';
import defaultChartOptions, {
  grid,
  getThresholdConfig,
  getAnnotationsConfig,
  dataZoomAdjustments,
  defaultAreaOpacity,
  mergeSeriesToOptions,
  lineStyle,
  getDefaultTooltipContent,
} from '../../../utils/charts/config';
import { debounceByAnimationFrame } from '../../../utils/utils';
import { colorFromPalette } from '../../../utils/charts/theme';
import TooltipDefaultFormat from '../../shared_components/charts/tooltip_default_format.vue';

export default {
  components: {
    Chart,
    ChartLegend,
    ChartTooltip,
    TooltipDefaultFormat,
  },
  mixins: [ToolboxMixin],
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
    annotations: {
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
    legendAverageText: {
      type: String,
      required: false,
      default: 'Avg',
    },
    legendMaxText: {
      type: String,
      required: false,
      default: 'Max',
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
      return this.data.map((series, index) => {
        const defaultColor = colorFromPalette(index);
        const getColor = type =>
          series[type] && series[type].color ? series[type].color : defaultColor;
        return merge(
          {
            areaStyle: {
              opacity: defaultAreaOpacity,
              color: getColor('areaStyle'),
            },
            showSymbol: false,
            lineStyle: {
              color: getColor('lineStyle'),
            },
            itemStyle: {
              color: getColor('itemStyle'),
            },
          },
          lineStyle,
          series,
          getThresholdConfig(this.thresholds),
          getAnnotationsConfig(this.annotations)
        );
      });
    },
    options() {
      const mergedOptions = merge(
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
          },
          yAxis: {
            axisTick: {
              show: false,
            },
          },
          legend: {
            show: false,
          },
        },
        this.option,
        dataZoomAdjustments(this.option.dataZoom),
        this.toolboxAdjustments
      );
      // All chart options can be merged but series
      // needs to be handled specially
      return mergeSeriesToOptions(mergedOptions, this.series);
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
      const { xLabels, tooltipContent } = getDefaultTooltipContent(params, this.options.yAxis.name);

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
      const { seriesData = [] } = params;
      // seriesData is an array of nearby data point coordinates
      // seriesData[0] is the nearest point at which the tooltip is displayed
      // https://echarts.apache.org/en/option.html#xAxis.axisPointer.label.formatter
      if (seriesData.length && seriesData[0].data) {
        const { seriesId, data } = seriesData[0];
        const [left, top] = this.chart.convertToPixel({ seriesId }, data);

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
      v-on="$listeners"
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
          <template v-if="options.xAxis.name">({{ options.xAxis.name }})</template>
        </div>
        <tooltip-default-format :tooltip-content="tooltipContent" />
      </template>
    </chart-tooltip>
    <chart-legend
      v-if="compiledOptions"
      :chart="chart"
      :style="legendStyle"
      :series-info="seriesInfo"
      :text-style="compiledOptions.textStyle"
      :average-text="legendAverageText"
      :max-text="legendMaxText"
    />
  </div>
</template>
