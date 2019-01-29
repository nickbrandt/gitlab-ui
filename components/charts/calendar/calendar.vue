<script>
import mergeWith from 'lodash/mergeWith';
import Chart from '../chart/chart.vue';
import {
  additiveArrayMerge,
} from '../../../helpers/chart';

export default {
  components: {
    Chart,
  },
  inheritAttrs: false,
  props: {
    data: {
      type: Array,
      required: true,
    },
    option: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  computed: {
    options() {
      return mergeWith(
        {},
        {
          visualMap: {
            pieces: [{
              max: 0,
              color: '#ededed',
            },{
              min: 1,
              max: 9,
              color: 'rgb(172, 213, 242)',
            }, {
              min: 10,
              max: 19,
              color: 'rgb(127, 168, 201)',
            }, {
              min: 20,
              max: 29,
              color: 'rgb(82, 123, 160)',
            }, {
              min: 30,
              color: 'rgb(37, 78, 119)',
            }],
            type: 'piecewise',
            orient: 'horizontal',
            showLabel: false,
            itemSymbol: 'none',
            itemGap: 2,
            bottom: 0,
          },
          series: {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: this.data,
          },
          calendar: {
            top: 20,
            left: 20,
            cellSize: 17,
            itemStyle: {
                borderWidth: 2,
                borderColor: '#FFF',
                color: '#ededed'
            },
            splitLine: {
              show: false,
            },
            dayLabel: {
              nameMap: ['', 'M', '', 'W', '', 'F', ''],
              color: '#959494',
            },
            monthLabel: {
              color: '#959494',
            },
            yearLabel: {
              show: false,
            },
          }
        },
        this.option,
        additiveArrayMerge
      );
    },
  },
  methods: {
    onCreated(chart) {
      this.chart = chart;
      this.$emit('created', chart);
    },
    onUpdated(chart) {
      this.$emit('updated', chart);
    },
  },
};
</script>

<template>
  <div class="position-relative">
    <chart
      v-bind="$attrs"
      :options="options"
      @created="onCreated"
      @updated="onUpdated"
    />
  </div>
</template>
