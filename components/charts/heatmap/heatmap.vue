<script>
import merge from 'lodash/merge';
import Chart from '../chart/chart.vue';
import ToolboxMixin from '../../mixins/toolbox_mixin';
import { heatmapHues } from '../../../utils/charts/theme';
import { whiteLight, gray100 } from '../../../scss_to_js/scss_variables'; // eslint-disable-line import/no-unresolved

const defaultOptions = {
  tooltip: {
    transitionDuration: 0,
  },
  visualMap: {
    type: 'piecewise',
    orient: 'horizontal',
    left: 'center',
    inRange: {
      color: heatmapHues,
    },
  },
  series: {
    type: 'heatmap',
  },
};

/*
 * The series is an array of arrays containing [x, y, value]
 * x and y are position, value determines the color
 * We want the min and max from value field to make the range of colors
 */
function getRange(series) {
  return series.reduce(
    (acc, curr) => {
      const value = curr[2] || 0;
      if (value < acc.min) acc.min = value;
      if (value > acc.max) acc.max = value;
      return acc;
    },
    { min: 0, max: 0 }
  );
}

export default {
  components: {
    Chart,
  },
  mixins: [ToolboxMixin],
  props: {
    options: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    dataSeries: {
      type: Array,
      required: true,
    },
    xAxisLabels: {
      type: Array,
      required: false,
      default: () => [],
    },
    yAxisLabels: {
      type: Array,
      required: false,
      default: () => [],
    },
    xAxisName: {
      type: String,
      required: false,
      default: '',
    },
    yAxisName: {
      type: String,
      required: false,
      default: '',
    },
  },
  computed: {
    computedOptions() {
      const { min, max } = getRange(this.dataSeries);
      return merge(
        {},
        defaultOptions,
        {
          series: {
            data: this.dataSeries,
            z: 2,
          },
          grid: {
            height: '30%',
            left: '10%',
            show: true,
            borderWidth: 0,
            backgroundColor: gray100,
          },
          visualMap: {
            min,
            max,
          },
          xAxis: {
            data: this.xAxisLabels,
            z: 3,
            axisTick: false,
            name: this.xAxisName,
            nameLocation: 'middle',
            nameTextStyle: {
              verticalAlign: 'middle',
            },
            offset: 6,
            splitLine: {
              show: true,
              lineStyle: {
                color: whiteLight,
                width: 2,
              },
            },
          },
          yAxis: {
            data: this.yAxisLabels,
            z: 3,
            type: 'category',
            axisTick: false,
            axisLabel: {
              margin: 8,
            },
            name: this.yAxisName,
            nameLocation: 'middle',
            nameGap: 50,
            nameRotate: 90,
            splitLine: {
              show: true,
              lineStyle: {
                color: whiteLight,
                width: 2,
              },
            },
          },
        },
        this.toolboxAdjustments,
        this.options
      );
    },
  },
};
</script>

<template>
  <chart :options="computedOptions"/>
</template>
