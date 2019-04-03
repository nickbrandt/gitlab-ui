<script>
import mergeWith from 'lodash/mergeWith';
import Chart from '../chart/chart.vue';
import ChartLegend from '../legend/legend.vue';
import ChartTooltip from '../tooltip/tooltip.vue';
import defaultChartOptions, {
  grid,
  additiveArrayMerge,
  getDataZoomConfig,
} from '../../../helpers/charts/config';
import { hexToRgba, debounceByAnimationFrame } from '../../../helpers/utils';
import { colorFromPalette } from '../../../helpers/charts/theme';

export default {
  components: {
    Chart,
    ChartTooltip,
    ChartLegend,
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
    presentation: {
      type: String,
      required: false,
      default: 'stacked',
      validator: value => ['stacked', 'tiled'].indexOf(value) !== -1,
    },
    groupBy: {
      type: Array,
      required: true,
    },
    xAxisType: {
      type: String,
      required: true,
      validator: value => ['value', 'category', 'time', 'log'].indexOf(value) !== -1,
    },
    xAxisTitle: {
      type: String,
      required: true,
    },
    yAxisTitle: {
      type: String,
      required: true,
    },
    seriesNames: {
      type: Array,
      required: true,
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
      debouncedMoveShowTooltip: debounceByAnimationFrame(this.moveShowTooltip),
    };
  },
  computed: {
    series() {
      return this.data.map((series, index) => {
        const barColor = colorFromPalette(index);

        return {
          type: 'bar',
          stack: this.presentation === 'stacked' ? this.groupBy : null,
          name: this.seriesNames[index],
          data: series,
          barMaxWidth: '50%',
          itemStyle: {
            color: hexToRgba(barColor, 0.2),
            barBorderColor: barColor,
            barBorderWidth: 1,
          },
          emphasis: {
            itemStyle: {
              color: hexToRgba(barColor, 0.4),
            },
          },
        };
      });
    },
    options() {
      return mergeWith(
        {},
        defaultChartOptions,
        {
          xAxis: {
            boundaryGap: true,
            axisLabel: {
              margin: 20,
              verticalAlign: 'bottom',
            },
            axisLine: {
              show: false,
            },
            axisPointer: {
              show: true,
              type: 'none',
              label: {
                formatter: this.onLabelChange,
              },
            },
            data: this.groupBy,
            name: this.xAxisTitle,
            type: this.xAxisType,
          },
          yAxis: {
            name: this.yAxisTitle,
            axisTick: {
              show: false,
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
    legendStyle() {
      return { paddingLeft: `${grid.left}px` };
    },
    compiledOptions() {
      return this.chart ? this.chart.getOption() : null;
    },
    seriesInfo() {
      return this.compiledOptions.series.reduce((acc, series, index) => {
        acc.push({
          name: series.name,
          type: series.type,
          color: colorFromPalette(index),
          data: series.data.map(data => data),
        });

        return acc;
      }, []);
    },
    dataZoomAdjustments() {
      const useSlider = !!this.option.dataZoom;

      return useSlider ? getDataZoomConfig({ filterMode: 'weakFilter' }) : {};
    },
  },
  beforeDestroy() {
    this.chart.getDom().removeEventListener('mousemove', this.debouncedMoveShowTooltip);
    this.chart.getDom().removeEventListener('mouseout', this.debouncedMoveShowTooltip);
  },
  methods: {
    moveShowTooltip(mouseEvent) {
      this.tooltipPosition = {
        left: `${mouseEvent.zrX}px`,
        top: `${mouseEvent.zrY}px`,
      };
      this.showTooltip = this.chart.containPixel('grid', [mouseEvent.zrX, mouseEvent.zrY]);
    },
    onCreated(chart) {
      chart.getDom().addEventListener('mousemove', this.debouncedMoveShowTooltip);
      chart.getDom().addEventListener('mouseout', this.debouncedMoveShowTooltip);
      this.chart = chart;
      this.$emit('created', chart);
    },
    onUpdated(chart) {
      this.$emit('updated', chart);
    },
    onLabelChange(params) {
      const { tooltipContent } = params.seriesData.reduce(
        (acc, bar) => {
          acc.tooltipContent[bar.seriesName] = {
            value: bar.value,
            index: bar.seriesIndex,
          };

          return acc;
        },
        {
          tooltipContent: {},
        }
      );

      this.tooltipTitle = params.value;
      this.$set(this, 'tooltipContent', tooltipContent);
    },
    styleIndicator(index) {
      const barColor = colorFromPalette(index);

      return {
        width: '16px',
        height: '4px',
        backgroundColor: barColor,
        marginRight: '4px',
      };
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
      <div slot="title">
        {{ tooltipTitle }}
      </div>
      <div
        v-for="(value, label) in tooltipContent"
        :key="label + value.value"
        class="d-flex align-items-center"
      >
        <div :style="styleIndicator(value.index)"></div>
        <div class="flex-grow-1">{{ label }}</div>
        <div class="text-right">{{ value.value }}</div>
      </div>
    </chart-tooltip>
    <chart-legend
      v-if="compiledOptions"
      :style="legendStyle"
      :series-info="seriesInfo"
      :text-style="compiledOptions.textStyle"
    />
  </div>
</template>
