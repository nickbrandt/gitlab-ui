<script>
export default {
  data() {
    return {
      chart: null,
      options: {
        legend: { show: false },
        xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
        yAxis: { type: 'value' },
        // Generate the series with generateSeriesData() after
        // https://gitlab.com/gitlab-org/gitlab-ui/-/issues/754
        // gets implemented
        series: [
          {
            color: '#1f75cb',
            data: [820, 932, 960, 1150, 1290, 1330, 1390],
            name: 'Toggled Series 1',
            showSymbol: true,
            type: 'line',
          },
          {
            color: '#108548',
            data: [1640, 1864, 1920, 2300, 2580, 2660, 2780],
            name: 'Series 2',
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
        data: series.data,
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
