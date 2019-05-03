<script>
export default {
  data() {
    return {
      echartInstance: null,
      tooltipContent: {
        'Series 1': {
          index: 0,
          value: 5,
        },
        'Series 2': {
          index: 1,
          value: 10,
        },
      },
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
      top="50%"
      left="0px"
    >
      <div slot="title">
        Tooltip Title
      </div>
      <gl-content-from-data :tooltip-content="tooltipContent"/>
    </gl-chart-tooltip>
  </div>
</template>
