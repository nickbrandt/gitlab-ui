<script>
import Chart from '../chart/chart.vue';
import Tooltip from '../tooltip/tooltip.vue';
import declarative from '../../mixins/declarative_chart';
import { deepAssign } from '../../../helpers/utils';

export default {
  components: {
    Chart,
    Tooltip,
  },
  mixins: [declarative],
  props: {
    data: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      tooltipTitle: '',
      tooltipInfo: {},
    };
  },
  computed: {
    xData() {
      return Object.keys(this.data);
    },
    yData() {
      return Object.values(this.data);
    },
    options() {
      return deepAssign(
        {
          xAxis: {
            name: 'Time',
            type: 'value',
            boundaryGap: false,
            data: this.xData,
            axisLabel: {
              color: this.$options.colors.textTertiary,
              margin: 20,
              verticalAlign: 'bottom',
            },
            axisLine: {
              lineStyle: { width: 0 },
            },
            axisTick: {
              alignWithLabel: true,
              lineStyle: {
                color: this.$options.colors.textQuaternary,
              },
            },
            nameLocation: 'center',
            nameTextStyle: {
              color: this.$options.colors.text,
              fontStyle: 'bold',
              padding: [24, 0, 0, 0],
            },
          },
          yAxis: {
            name: 'Value',
            type: 'value',
            axisLabel: {
              color: this.$options.colors.textTertiary,
            },
            axisLine: {
              lineStyle: { width: 0 },
            },
            axisTick: {
              alignWithLabel: true,
              lineStyle: {
                color: this.$options.colors.textQuaternary,
              },
            },
            nameLocation: 'center',
            nameTextStyle: {
              color: this.$options.colors.text,
              fontStyle: 'bold',
              padding: [0, 0, 40, 0],
            },
          },
          tooltip: {
            trigger: 'axis',
            formatter: this.renderTooltip,
            backgroundColor: this.$options.colors.tooltipBackground,
            padding: 0,
            borderWidth: 1,
            borderColor: this.$options.colors.textQuaternary,
            textStyle: {
              color: this.$options.colors.textTertiary,
            },
            axisPointer: {
              lineStyle: {
                color: this.$options.colors.textTertiary,
              },
            },
          },
          series: [
            {
              type: 'line',
              data: this.yData,
              showSymbol: false,
              lineStyle: {
                width: 1,
              },
              itemStyle: {
                color: this.$options.colors.line,
              },
              areaStyle: {
                color: this.$options.colors.area,
              },
            },
          ],
        },
        this.declarations,
      );
    },
  },
  methods: {
    renderTooltip(params, ticket, callback) {
      const [line] = params;
      this.tooltipTitle = line.axisValueLabel;
      this.tooltipInfo = {
        [this.options.yAxis.name || '']: line.value,
      };
      this.$nextTick(() => callback(ticket, this.$refs.tooltip.$el.innerHTML));
      return ' ';
    },
  },
  colors: {
    tooltipBackground: '#fff',
    text: '#2e2e2e',
    textSecondary: '#707070',
    textTertiary: '#919191',
    textQuaternary: '#d6d6d6',
    area: 'rgba(31,120,209,0.10)',
    line: '#1F78D1',
  },
};
</script>

<template>
  <div>
    <chart 
      :options="options"
      @created="chart => $emit('created', chart)"
      @updated="chart => $emit('updated', chart)"
    />
    <tooltip
      v-show="false"
      ref="tooltip"
      :title="tooltipTitle"
      :info="tooltipInfo"
    />
  </div>
</template>