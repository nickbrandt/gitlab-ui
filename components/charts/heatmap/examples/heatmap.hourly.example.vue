<template>
  <gl-heatmap
    title="Errors per hour"
    :data-series="data"
    :x-axis-labels="xAxisLabels"
    :y-axis-labels="yAxisLabels"
  />
</template>

<script>
function generateData() {
  const hours = 24;
  const days = 7;
  const res = [];
  for (let x=0; x < hours; x += 1) {
    for (let y=0; y < days; y += 1) {
      const val = Math.random() * 10;
      res.push([x, y, val]);
    }
  }
  return res;
}

export default {
  data() {
    return {
      data: generateData(),
      xAxisLabels: ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
              '7a', '8a', '9a','10a','11a',
              '12p', '1p', '2p', '3p', '4p', '5p',
              '6p', '7p', '8p', '9p', '10p', '11p'],
      yAxisLabels: ['Saturday', 'Friday', 'Thursday',
              'Wednesday', 'Tuesday', 'Monday', 'Sunday'],
    };
  },
};
</script>
