<script>
import SeriesLabel from '../../charts/series_label/series_label.vue';

export default {
  components: {
    SeriesLabel,
  },
  props: {
    tooltipContent: {
      type: Object,
      required: true,
    },
  },
};
</script>
<template>
  <div>
    <div
      v-for="(value, label) in tooltipContent"
      :key="`${label}${value.value}`"
      class="d-flex"
    >
      <series-label
        :color="value.color"
        class="flex-grow-1"
      >
        {{ label }}
      </series-label>
      <div class="prepend-left-32 pull-right">{{ value.value }}</div>
    </div>
  </div>
</template>
