<script>
export default {
  data() {
    return {
      chartData: [
        {
          data: [
            ['19 May', 6.95],
            ['20 May', 7.58],
            ['21 May', 8.81],
            ['22 May', 8.33],
            ['22 May', 10],
            ['23 May', 9.96],
            ['24 May', 7.24],
            ['25 May', 4.26],
          ],
          type: 'scatter',
        },
      ],
    };
  },
};
</script>
<template>
  <gl-discrete-scatter-chart
    :data="chartData"
    :option="{}"
    y-axis-title="Pushes by day"
    x-axis-title="Date"
  />
</template>
