<script>
import merge from 'lodash/mergeWith';
import Chart from '../chart/chart.vue';
import { bluesHues } from '../../../helpers/charts/theme';

const [blue50, blue950] = bluesHues;

const defaultOptions = {
  title: {
    top: 30,
    left: 'center',
    text: '',
  },
  tooltip: {
    transitionDuration: 0,
  },
  visualMap: {
    min: 0,
    max: 1000,
    type: 'piecewise',
    orient: 'horizontal',
    left: 'center',
    top: 65,
    inRange: {
      color: [blue50, blue950],
    },
  },
  calendar: {
    top: 120,
    left: 30,
    right: 30,
    cellSize: [15, 15],
    itemStyle: {
    },
    dayLabel: {
      firstDay: 0, // TODO: or 1 to start on Monday
    },
    yearLabel: { show: false },
  },
  series: {
    type: 'heatmap',
    coordinateSystem: 'calendar',
  },
};

function getRange(series) {
  const first = series[0];
  const last = series[series.length - 1];
  return [
    first[0],
    last[0],
  ];
}

export default {
  components: {
    Chart,
  },
  props: {
    seriesData: {
      type: Array,
      required: true,
    },
  },
  computed: {
    options() {
      return merge(
        {},
        defaultOptions,
        {
          series: {
            data: this.seriesData,
          },
          calendar: {
            range: getRange(this.seriesData),
          },
        });
    },
  },
};
</script>

<template>
  <chart :options="options" />
</template>
