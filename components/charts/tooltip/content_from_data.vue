<script>
import ChartSeriesLabel from '../series_label/series_label.vue';
import { colorFromPalette } from '../../../utils/charts/theme';

export default {
  components: {
    ChartSeriesLabel,
  },
  inheritAttrs: false,
  props: {
    tooltipContent: {
      type: Object,
      required: true,
      validator(tooltipContent) {
        return Object.keys(tooltipContent).every(
          key => tooltipContent[key].value && Number.isInteger(tooltipContent[key].index)
        );
      },
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
    style="min-width: 150px; max-width: 450px;"
  >
    <chart-series-label :color="styleIndicator(value.index)" class="gl-pr-3">
      <div>{{label}}</div>
    </chart-series-label>
    <div class="flex-grow-1 text-right gl-pl-3 bold">{{ value.value }}</div>
  </div>
</div>
</template>
