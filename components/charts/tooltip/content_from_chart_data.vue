<script>
import ChartSeriesLabel from '../series_label/series_label.vue';
import { colorFromPalette } from '../../../helpers/charts/theme';

export default {
  components: {
    ChartSeriesLabel,
  },
  inheritAttrs: false,
  props: {
    tooltipContent: {
      type: Array,
      required: true,
    },
  },
  methods: {
    styleIndicator(index) {
      return colorFromPalette(index);
    },
  },
};
</script>

<template>
<div>
  <div
    v-for="(value, label) in tooltipContent"
    :key="label + value.value"
    class="d-flex align-items-center"
    style="min-width: 150px;"
  >
    <chart-series-label :color="styleIndicator(value.index)" class="">
      <div>{{label}}</div>
    </chart-series-label>
    <div class="flex-grow-1 text-right gl-pl-3">{{ value.value }}</div>
  </div>
</div>
</template>
