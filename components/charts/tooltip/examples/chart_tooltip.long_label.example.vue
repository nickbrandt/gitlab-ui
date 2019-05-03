<script>
export default {
  data() {
    return {
      echartInstance: null,
      tooltipContent: {
        'This series has a really long name. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.': {
          index: 0,
          value: 5,
          color: '#1f78d1',
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
