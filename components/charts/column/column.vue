<script>
import mergeWith from 'lodash/mergeWith';
import Chart from '../chart/chart.vue';
import ChartTooltip from '../tooltip/tooltip.vue';
import { colors, yAxis, additiveArrayMerge } from '../../../helpers/chart';
import { colors, yAxis, additiveArrayMerge, grid, axes } from '../../../helpers/chart';
import { hexToRgba, debounceByAnimationFrame } from '../../../helpers/utils';

export default {
  components: {
    Chart,
    ChartTooltip,
  },
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
        let colorIndex = index;
        const barColorsCount = colors.lines.length;
        while (colorIndex >= barColorsCount) {
          colorIndex -= barColorsCount;
        }
        const barColor = colors.lines[colorIndex];

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
        {
          xAxis: axes,
          yAxis,
          legend: {},
          grid,
          colors: {},
        },
        {
          xAxis: {
            axisLabel: {
              margin: 20,
              verticalAlign: 'bottom',
              color: colors.textTertiary,
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              alignWithLabel: true,
              lineStyle: {
                color: colors.splitLine,
              },
            },
            axisPointer: {
              show: true,
              type: 'none',
              lineStyle: {
                color: colors.textTertiary,
              },
              label: {
                show: false,
                formatter: this.onLabelChange,
              },
            },
            nameTextStyle: {
              padding: [16, 0, 0, 0],
            },
            splitLine: {
              show: false,
            },
            name: this.xAxisTitle,
          },
          yAxis: {
            name: this.yAxisTitle,
          },
          series: this.series,
          legend: {
            show: false,
          },
        },
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
