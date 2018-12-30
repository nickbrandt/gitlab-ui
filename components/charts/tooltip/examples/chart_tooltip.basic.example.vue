<script>
export default {
  data() {
    return {
      echartInstance: null,
    };
  },
  methods: {
    onCreated(chart) {
      this.echartInstance = chart;
    },
  },
};
</script>

<template>
  <div class="position-relative">
    <gl-chart
      :options="{}"
      :height="100"
      @created="onCreated"
    />
    <gl-chart-tooltip
      v-if="echartInstance"
      :chart="echartInstance"
      :show="true"
      :position="{
        top: '50%',
        left: '0',
      }"
    >
      <div slot="title">
        Tooltip Title
      </div>
      Basic Tooltip Content
    </gl-chart-tooltip>
  </div>
</template>
