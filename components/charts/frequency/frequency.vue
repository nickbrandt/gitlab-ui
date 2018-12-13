<script>
import Chart from '../chart/chart.vue';
import ChartTooltip from '../tooltip/tooltip.vue';

export default {
  components: {
    Chart,
    ChartTooltip,
  },
  inheritAttrs: false,
  props: {
    chartData: {
      type: Array,
      required: true,
    },
    barWidth: {
      type: Number,
      required: false,
      default: 30,
    },
  },
  data() {
    return {
      chart: null,
      options: {
        grid: {
          top: 8,
          bottom: 8,
          left: 16,
          right: 16,
        },
        xAxis: {
          type: 'category',
          show: false,
        },
        yAxis: {
          show: false,
        },
        series: [
          {
            data: Object.entries(this.chartData.map(d => d.value)),
            type: 'bar',
            barWidth: this.barWidth,
            barMinHeight: 3,
            itemStyle: {
              color: '#6666c4',
              opacity: 0.2,
            },
            emphasis: {
              itemStyle: {
                opacity: 0.4,
              },
            },
          },
        ],
      },
      tooltipTitle: null,
      tooltipContent: null,
      tooltipPosition: {
        bottom: 0,
        left: 0,
      },
      showPopover: false,
    };
  },
  methods: {
    onChartCreated(chart) {
      chart.on('mouseover', this.onMouseover);
      chart.on('mouseout', this.onMouseout);
      this.chart = chart;
    },
    onMouseover(params) {
      const [index] = params.value;
      this.tooltipTitle = Intl.DateTimeFormat(this.$options.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      }).format(this.chartData[index].date);
      this.tooltipContent = `${this.chartData[index].value} events`;

      const [left] = this.chart.convertToPixel('grid', params.data);
      this.tooltipPosition.left = `${left}px`;

      this.showPopover = true;
    },
    onMouseout() {
      this.showPopover = false;
    },
  },
  language: document.querySelector('html').getAttribute('lang') || 'en',
};
</script>

<template>
  <div class="position-relative">
    <chart
      v-bind="$attrs"
      :options="options"
      @created="onChartCreated"
    />
    <chart-tooltip
      v-if="chart"
      :position="tooltipPosition"
      :chart="chart"
      :show="showPopover"
      placement="bottom"
      triggers=""
    >
      <div slot="title">{{ tooltipTitle }}</div>
      {{ tooltipContent }}
    </chart-tooltip>
  </div>
</template>
