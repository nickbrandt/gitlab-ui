<script>
export default {
  data() {
    return {
      chart: null,
      options: {
        legend: {
          show: false,
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            color: '#1f78d1',
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            name: 'Toggled Series',
            showSymbol: true,
            type: 'line',
          },
          {
            color: '#1aaa55',
            data: [920, 1032, 951, 884, 990, 1030, 920],
            name: 'Series',
            showSymbol: true,
            type: 'line',
          },
        ],
      },
    };
  },
  computed: {
    seriesData() {
      return this.options.series.map(series => ({
        type: 'solid',
        name: series.name,
        color: series.color,
      }));
    },
  },
  mounted() {
    this.$nextTick(() => {
      document.querySelector('#js-chart-legend [role=button]').click();
    });
  },
  methods: {
    onCreated(chart) {
      this.chart = chart;
    },
  },
};
</script>

<template>
  <div>
    <gl-chart :options="options" @created="onCreated" />
    <gl-chart-legend v-if="chart" id="js-chart-legend" :chart="chart" :series-info="seriesData" />
  </div>
</template>
