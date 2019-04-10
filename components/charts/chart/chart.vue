<script>
import echarts from 'echarts';
import theme, { themeName } from '../../../helpers/charts/theme';
import { defaultHeight, validRenderers } from '../../../helpers/charts/config';

export default {
  props: {
    options: {
      type: Object,
      required: true,
    },
    /**
     * Warning: this prop is deprecated and will soon be removed
     * Please do not utilize `disableTheme` for formatting
     * Use the `options` prop to set desired echarts formatting
     */
    disableTheme: {
      type: Boolean,
      required: false,
      default: true,
    },
    width: {
      type: Number,
      required: false,
      default: null,
    },
    height: {
      type: Number,
      required: false,
      default: null,
    },
    groupId: {
      type: String,
      required: false,
      default: '',
    },
    renderer: {
      type: String,
      required: false,
      default: 'canvas',
      validator(renderer) {
        return validRenderers.includes(renderer);
      },
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    options() {
      this.draw();
    },
    width() {
      this.setChartSize();
    },
    height() {
      this.setChartSize();
    },
  },
  created() {
    if (!this.disableTheme) {
      echarts.registerTheme(themeName, theme);
    }
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chart, this.disableTheme ? null : themeName, {
      renderer: this.renderer,
    });
    if (this.groupId.length) {
      this.chart.group = this.groupId;
      echarts.connect(this.groupId);
    }
    this.$emit('created', this.chart);
    this.draw();
    this.setChartSize();
  },
  methods: {
    draw() {
      // this.chart.setOption(this.options);
      // console.log('OPTIONS:', this.options)
      const option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        name: 'series1',
        type: 'line'
    },{
        data: [100, 200, 300, 400, 500, 600, 700],
        name: 'series2',
        type: 'line'
    }],
    legend: {
        type: "plain",
        y: "bottom",
        itemWidth: 8,
        itemHeight: 8,
        formatter(name) {
            return `{name|${name}}  {value|test}`;
        },
        textStyle: {
            width: 40,
            rich: {
                name: {
                    color: "#86919A",
                },
                value: {
                    color: "#EFC044",
                }
            }
        }
    },
};
      this.chart.setOption(option);
      this.$emit('updated', this.chart);
    },
    setChartSize() {
      this.chart.resize({
        width: this.width || 'auto',
        height: this.height || defaultHeight,
      });
    },
  },
};
</script>

<template>
  <div ref="chart"></div>
</template>
