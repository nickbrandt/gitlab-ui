<script>
import merge from 'lodash/merge';
import Chart from '../chart/chart.vue';
import ChartTooltip from '../tooltip/tooltip.vue';
import ToolboxMixin from '../../mixins/toolbox_mixin';
import defaultChartOptions, { mergeSeriesToOptions } from '../../../utils/charts/config';
import { debounceByAnimationFrame } from '../../../utils/utils';
import { colorFromPalette } from '../../../utils/charts/theme';
import { gray200 } from '../../../scss_to_js/scss_variables'; // eslint-disable-line import/no-unresolved

export default {
  components: {
    Chart,
    ChartTooltip,
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
    yAxisTitle: {
      type: String,
      required: true,
    },
    xAxisTitle: {
      type: String,
      required: true,
    },
    symbolSize: {
      type: Number,
      required: false,
      default: 8,
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
      return this.data.map((series, index) => {
        const defaultColor = colorFromPalette(index);
        const getColor = type =>
          series[type] && series[type].color ? series[type].color : defaultColor;

        return merge(
          {
            symbolSize: this.symbolSize,
            lineStyle: {
              color: getColor('lineStyle'),
            },
            itemStyle: {
              color: getColor('itemStyle'),
            },
          },
          series
        );
      });
    },
    options() {
      const mergedOptions = merge(
        {},
        defaultChartOptions,
        {
          xAxis: {
            type: 'category',
            name: this.xAxisTitle,
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
          yAxis: {
            type: 'value',
            name: this.yAxisTitle,
          },
          legend: {
            show: false,
          },
        },
        this.option,
        this.toolboxAdjustments
      );
      // All chart options can be merged but series
      // needs to be handled specially
      return mergeSeriesToOptions(mergedOptions, this.series);
    },
  },
  methods: {
    defaultFormatTooltipText(params) {
      const { xLabels, tooltipContent } = params.seriesData.reduce(
        (acc, series) => {
          const [title, value] = series.value || [];
          acc.tooltipContent[series.seriesName] = value;
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
    showHideTooltip(mouseEvent) {
      this.showTooltip = this.chart.containPixel('grid', [mouseEvent.zrX, mouseEvent.zrY]);
    },
    onCreated(chart) {
      chart.getDom().addEventListener('mousemove', this.debouncedShowHideTooltip);
      chart.getDom().addEventListener('mouseout', this.debouncedShowHideTooltip);
      this.chart = chart;
      this.$emit('created', chart);
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
        const [left, top] = this.chart.convertToPixel('grid', seriesData[0].data);
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
    <chart v-bind="$attrs" :options="options" v-on="$listeners" @created="onCreated" @updated="onUpdated" />
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
        <div slot="title">{{ tooltipTitle }}</div>
        <div v-for="(value, label) in tooltipContent" :key="label + value">
          {{ label }}
          {{ value }}
        </div>
      </template>
    </chart-tooltip>
  </div>
</template>
