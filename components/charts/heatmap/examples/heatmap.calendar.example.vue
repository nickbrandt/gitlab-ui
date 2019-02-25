<template>
  <gl-heatmap
    title="heatmap default"
    :series-data="dataSeries"
  />
</template>

<script>
import echarts from 'echarts';

export default {
  computed: {
    dataSeries() {
      const year = 2016;
      const date = +echarts.number.parseDate(`${year}-01-01`);
      const end = +echarts.number.parseDate(`${+year + 1}-01-01`);
      const dayTime = 3600 * 24 * 1000;
      const data = [];
      for (let time = date; time < end; time += dayTime) {
        data.push([echarts.format.formatTime('yyyy-MM-dd', time), Math.floor(Math.random() * 10000)]);
      }
      return data;
    }
  }
}
</script>
