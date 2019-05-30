<script>
import merge from 'lodash/mergeWith';
import Chart from '../chart/chart.vue';
import ToolboxMixin from '../../mixins/toolbox_mixin';
import { bluesHues } from '../../../utils/charts/theme';

const [blue200, blue800] = bluesHues;

const defaultOptions = {
  title: {
    top: 24,
    left: 'center',
  },
  tooltip: {
    transitionDuration: 0,
  },
  visualMap: {
    type: 'piecewise',
    orient: 'horizontal',
    left: 'center',
    inRange: {
      color: [blue200, blue800],
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
    title: {
      type: String,
      required: false,
      default: '',
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
  },
  computed: {
    computedOptions() {
      const { min, max } = getRange(this.dataSeries);
      return merge(
        {},
        defaultOptions,
        {
          title: {
            text: this.title,
          },
          series: {
            data: this.dataSeries,
          },
          grid: {
            height: '30%',
          },
          visualMap: {
            min,
            max,
          },
          xAxis: {
            data: this.xAxisLabels,
            splitArea: {
              show: true,
            },
          },
          yAxis: {
            type: 'category',
            data: this.yAxisLabels,
            splitArea: {
              show: true,
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
  <chart :options="computedOptions" />
</template>
