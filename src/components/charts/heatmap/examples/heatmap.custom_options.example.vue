<script>
export default {
  data() {
    return {
      series: (() => {
        const hours = 24;
        const days = 7;
        const res = [];
        for (let x = 0; x < hours; x += 1) {
          for (let y = 0; y < days; y += 1) {
            let val = Math.random() * 10;
            if (Math.random() > 0.5) {
              val = '-';
            }
            res.push([x, y, val]);
          }
        }
        return res;
      })(),
      xAxisLabels: [
        '12',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
      ],
      yAxisLabels: ['Sat', 'Fri', 'Thu', 'Wed', 'Tue', 'Mon', 'Sun'],
    };
  },
};
</script>

<template>
  <gl-heatmap
    :data-series="series"
    :x-axis-labels="xAxisLabels"
    :y-axis-labels="yAxisLabels"
    :options="{
      xAxis: {
        splitArea: {
          show: false,
        },
      },
      yAxis: {
        splitArea: {
          show: false,
        },
      },
    }"
  />
</template>
