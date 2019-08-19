<script>
import merge from 'lodash/merge';
import Chart from '../chart/chart.vue';
import ChartLegend from '../legend/legend.vue';
import ToolboxMixin from '../../mixins/toolbox_mixin';
import { heatmapHues } from '../../../utils/charts/theme';
import { whiteLight, gray100 } from '../../../scss_to_js/scss_variables'; // eslint-disable-line import/no-unresolved
import { throttle } from '../../../utils/utils';

const defaultOptions = {
  tooltip: {
    transitionDuration: 0,
    showContent: true,
  },
  visualMap: {
    show: false,
    inRange: {
      color: heatmapHues,
    },
  },
  series: {
    type: 'heatmap',
  },
};

/*
 * The series is an array of arrays containing [x, y, value]
 * x and y are position, value determines the color
 * We want the min and max from value field to make the range of colors
 */
function getRange(series) {
  return series.reduce(
    (acc, curr) => {
      const value = curr[2] || 0;
      if (value < acc.min) acc.min = value;
      if (value > acc.max) acc.max = value;
      return acc;
    },
    { min: 0, max: 0 }
  );
}

export default {
  components: {
    Chart,
    ChartLegend,
  },
  mixins: [ToolboxMixin],
  props: {
    options: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    dataSeries: {
      type: Array,
      required: true,
    },
    xAxisLabels: {
      type: Array,
      required: false,
      default: () => [],
    },
    yAxisLabels: {
      type: Array,
      required: false,
      default: () => [],
    },
    xAxisName: {
      type: String,
      required: false,
      default: '',
    },
    yAxisName: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      chart: null,
      tooltip: {
        show: false,
        left: '0',
        top: '0',
        title: '',
        content: '',
      },
    };
  },
  computed: {
    computedOptions() {
      const { min, max } = getRange(this.dataSeries);
      return merge(
        {},
        defaultOptions,
        {
          series: {
            data: this.dataSeries,
            z: 2,
          },
          tooltip: {
            formatter: params => {
              [, , this.tooltipContent] = params.data;
            },
          },
          grid: {
            height: '30%',
            left: '68px',
            show: true,
            borderWidth: 0,
            backgroundColor: gray100,
          },
          visualMap: {
            min,
            max,
          },
          xAxis: {
            data: this.xAxisLabels,
            z: 3,
            axisTick: false,
            name: this.xAxisName,
            nameGap: 26,
            nameLocation: 'middle',
            nameTextStyle: {
              verticalAlign: 'middle',
            },
            offset: 6,
            splitLine: {
              show: true,
              interval: 0,
              lineStyle: {
                color: whiteLight,
                width: 2,
              },
            },
          },
          yAxis: {
            data: this.yAxisLabels,
            z: 3,
            type: 'category',
            axisTick: false,
            axisLabel: {
              margin: 8,
            },
            name: this.yAxisName,
            nameLocation: 'middle',
            nameGap: 50,
            nameRotate: 90,
            splitLine: {
              show: true,
              interval: 0,
              lineStyle: {
                color: whiteLight,
                width: 2,
              },
            },
          },
        },
        this.toolboxAdjustments,
        this.options
      );
    },
    compiledOptions() {
      return this.chart ? this.chart.getOption() : null;
    },
    seriesInfo() {
      const { min, max } = getRange(this.dataSeries);
      const color = heatmapHues;
      const splitSize = (max - min) / color.length;
      let currentMin = min;

      return color.reduce((acc, hue) => {
        const currentMax = currentMin + splitSize;
        acc.push({
          name: `${this.formatNumber(currentMin)} -
            ${this.formatNumber(currentMax)}`,
          color: hue,
        });

        currentMin = currentMax;
        return acc;
      }, []);
    },
  },
  beforeDestroy() {
    this.chart.getDom().removeEventListener('mousemove', this.debouncedMouseMove);
    this.chart.getDom().removeEventListener('mouseout', this.debouncedMouseMove);
  },
  methods: {
    formatNumber(num) {
      return parseFloat(num).toFixed();
    },
    onCreated(chart) {
      this.chart = chart;
      this.throttledMouseMove = throttle(this.mouseMove);
      this.chart.getDom().addEventListener('mousemove', this.throttledMouseMove);
      this.chart.getDom().addEventListener('mouseout', this.hideTooltip);
    },
    mouseMove(mouseEvent) {
      const { zrX: x, zrY: y } = mouseEvent;
      this.tooltip = {
        left: `${x}px`,
        top: `${y}px`,
      };

      this.tooltip.show = this.chart.containPixel('grid', [x, y]);
    },
    hideTooltip() {
      this.tooltip.show = false;
    },
  },
};
</script>

<template>
  <div class="gl-heatmap-container">
    <chart 
      :options="computedOptions" 
      class="gl-heatmap"
      @created="onCreated"
    />
    <chart-legend 
      v-if="compiledOptions"
      :chart="chart"
      :series-info="seriesInfo"
      class="gl-heatmap-legend"
    />
    <gl-chart-tooltip
      v-if="chart"
      :chart="chart"
      :show="tooltip.show"
      :top="tooltip.top"
      :left="tooltip.left"
    >
      <div
        v-if="tooltip.title"
        slot="title"
      >{{ tooltip.title }}</div>
      {{ tooltipContent }}
    </gl-chart-tooltip>
  </div>
</template>
