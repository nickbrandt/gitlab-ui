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
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            name: 'Series Name',
            color: '#1F78D1',
            showSymbol: true,
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
    <gl-chart-legend v-if="chart" :chart="chart" :series-info="seriesData" />
  </div>
</template>
