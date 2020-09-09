<script>
import { BTooltip } from 'bootstrap-vue';
import { tooltipDelay } from '../../../utils/constants';

const TOOLTIP_ACTION_EVENTS = ['open', 'close', 'enable', 'disable'];

export default {
  tooltipDelay,
  components: {
    BTooltip,
  },
  inheritAttrs: false,
  mounted() {
    /**
     * Pass through the events to programmatically open, close, enable
     * and disable the tooltip.
     * https://bootstrap-vue.org/docs/components/tooltip#programmatically-show-and-hide-tooltip
     */
    TOOLTIP_ACTION_EVENTS.forEach(event =>
      this.$on(event, () => this.$refs.bvTooltip.$emit(event))
    );
  },
  beforeDestroy() {
    TOOLTIP_ACTION_EVENTS.forEach(event => this.$off(event));
  },
};
</script>

<template>
  <b-tooltip ref="bvTooltip" v-bind="$attrs" :delay="$options.tooltipDelay" v-on="$listeners">
    <slot></slot>
  </b-tooltip>
</template>
