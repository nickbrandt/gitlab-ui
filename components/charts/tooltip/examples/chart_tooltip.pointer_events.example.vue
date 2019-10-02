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
      :pointer-events="true"
      top="50%"
      left="0px"
    >
      <div slot="title">
        Tooltip title you can highlight
      </div>
      <a href="/">Clickable link!</a>
    </gl-chart-tooltip>
  </div>
</template>
