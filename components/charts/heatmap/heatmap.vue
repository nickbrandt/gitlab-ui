<script>
import merge from 'lodash/mergeWith';
import Chart from '../chart/chart.vue';
import { bluesHues } from '../../../helpers/charts/theme';

const [blue50, blue950] = bluesHues;

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
      color: [blue50, blue950],
    },
  },
  series: {
    type: 'heatmap',
  },
};

export default {
  components: {
    Chart,
  },
  props: {
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
    options() {
      return merge({}, defaultOptions, {
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
          min: 0,
          // TODO: getrange
          max: 10,
        },
        xAxis: {
          type: 'category',
          data: this.xAxisLabels,
        },
        yAxis: {
          type: 'category',
          data: this.yAxisLabels,
        },
      });
    },
  },
};
</script>

<template>
  <chart :options="options" />
</template>
