<script>
import mergeWith from 'lodash/mergeWith';
import Chart from '../chart/chart.vue';
import ChartTooltip from '../tooltip/tooltip.vue';
import ToolboxMixin from '../../mixins/toolbox_mixin';
import defaultChartOptions, {
  additiveArrayMerge,
  dataZoomAdjustments,
} from '../../../utils/charts/config';
import { hexToRgba, debounceByAnimationFrame } from '../../../utils/utils';
import { colorFromPalette } from '../../../utils/charts/theme';

export default {
  components: {
    Chart,
    ChartTooltip,
  },
  mixins: [ToolboxMixin],
  inheritAttrs: false,
  props: {
    data: {
      type: Object,
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
    xAxisType: {
      type: String,
      required: true,
      validator: value => ['value', 'category', 'time', 'log'].indexOf(value) !== -1,
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
      return Object.keys(this.data).map((key, index) => {
        const barColor = colorFromPalette(index);

        return {
          name: key,
          data: this.data[key],
          type: 'bar',
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
          large: true,
          largeThreshold: 300,
          barMaxWidth: '50%',
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
        dataZoomAdjustments(this.option.dataZoom),
        this.toolboxAdjustments,
        this.option,
        additiveArrayMerge
      );
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
    onLabelChange(params) {
      const { xLabels, tooltipContent } = params.seriesData.reduce(
        (acc, bar) => {
          const [title, value] = bar.value;
          acc.tooltipContent[bar.seriesName] = value;
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
    onUpdated(chart) {
      this.$emit('updated', chart);
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
        :key="label + value"
      >
        {{ value }}
      </div>
    </chart-tooltip>
  </div>
</template>
