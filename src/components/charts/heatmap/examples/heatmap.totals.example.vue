<script>
export default {
  data() {
    return {
      series: (() => {
        const hours = 12;
        const days = 20;
        const res = [];
        for (let x = 0; x < hours; x += 1) {
          for (let y = 0; y < days; y += 1) {
            const val = Math.ceil(Math.random() * (y % 12) - 3);
            res.push([x, y, val]);
          }
        }
        return res;
      })(),
      xAxisLabels: [
        '7am',
        '8am',
        '9am',
        '10am',
        '11am',
        '12pm',
        '1pm',
        '2pm',
        '3pm',
        '4pm',
        '5pm',
        '6pm',
      ],
    };
  },
};
</script>

<template>
  <gl-heatmap title="Pageviews per hour" :data-series="series" :x-axis-labels="xAxisLabels" />
</template>
