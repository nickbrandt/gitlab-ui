<script>
import echarts from 'echarts';
import { debounce } from '../../../helpers/utils';

export default {
  props: {
    options: {
      type: Object,
      required: true,
    },
    width: {
      type: Number,
      required: false,
      default: null,
    },
    height: {
      type: Number,
      required: false,
      default: 400,
    },
  },
  data() {
    return {
      chart: null,
      debouncedSetChartSize: debounce(this.setChartSize),
    };
  },
  watch: {
    width() {
      this.setChartSize();
    },
    height() {
      this.setChartSize();
    },
  },
  created() {
    window.addEventListener('resize', this.debouncedSetChartSize);
  },
  beforeDestory() {
    window.removeEventListener('resize', this.debouncedSetChartSize);
  },
  mounted() {
    const div = document.createElement('div');
    this.$refs.chart.appendChild(div);
    this.chart = echarts.init(div, null, { renderer: 'svg' });
    this.$emit('created', this.chart);
    this.draw();
  },
  methods: {
    draw() {
      this.chart.setOption(this.options || {});
      this.$emit('updated', this.chart);
      this.setChartSize();
    },
    setChartSize() {
      this.chart.resize({
        width: this.width || this.$refs.chart.clientWidth,
        height: this.height,
      });
    },
  },
};
</script>

<template>
  <div ref="chart"></div>
</template>

