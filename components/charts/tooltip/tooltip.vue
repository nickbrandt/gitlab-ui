<script>
import echarts from 'echarts';
import Popover from '../../base/popover/popover.vue';

export default {
  components: {
    Popover,
  },
  inheritAttrs: false,
  props: {
    chart: {
      type: Object,
      required: true,
      validator(chart) {
        return Object.is(chart, echarts.getInstanceByDom(chart.getDom()));
      },
    },
    position: {
      type: Object,
      required: false,
      default: () => ({
        top: 0,
        left: 0,
      }),
    },
  },
  computed: {
    containerId() {
      return `${this.chart.getDom().getAttribute('_echarts_instance_')}-tooltip`;
    },
  },
};
</script>

<template>
  <div>
    <div
      :id="containerId"
      :style="position"
      style="width: 1px; height: 1px"
      class="position-absolute no-pointer-events"
    ></div>
    <popover
      v-bind="$attrs"
      :target="containerId"
      :container="containerId"
      triggers=""
    >
      <template slot="title">
        <slot name="title"></slot>
      </template>
      <slot></slot>
    </popover>
  </div>
</template>
