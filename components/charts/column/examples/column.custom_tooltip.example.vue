<script>
export default {
  data() {
    return {
      tooltipTitle: '',
      tooltipContent: '',
    };
  },
  methods: {
    customTooltipFormatter(params) {
      const { value: label, seriesData } = params;
      const { data } = seriesData[0];
      const [, value] = data;
      this.tooltipTitle = label;
      this.tooltipContent = `This is my value: ${value}`;
    },
  },
};
</script>

<template>
  <gl-column-chart :data="{
    Full: [
      ['Mon', 1220],
      ['Tue', 932],
      ['Wed', 901],
      ['Thu', 934],
      ['Fri', 1290],
      ['Sat', 1330],
      ['Sun', 1320],
    ],
  }" 
  :option="{}"
  :custom-tooltip-formatter="customTooltipFormatter"
  y-axis-title="Pushes by day"
  x-axis-title="Username" 
  x-axis-type="category">
      <template slot="tooltipTitle">{{ tooltipTitle }}</template>
      <template slot="tooltipContent">{{ tooltipContent }}</template>
  </gl-column-chart>
</template>
