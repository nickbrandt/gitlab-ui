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

function getRange(series) {
  return series.reduce(
    (acc, curr) => {
      const val = curr[2] || 0;
      if (val < acc.min) acc.min = val;
      if (val > acc.max) acc.max = val;
      return acc;
    },
    { min: 0, max: 0 }
  );
}

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
      const { min, max } = getRange(this.dataSeries);
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
          min,
          max,
        },
        xAxis: {
          type: 'category',
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
      });
    },
  },
};
</script>

<template>
  <chart :options="options" />
</template>
