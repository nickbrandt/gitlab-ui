<script>
import { BTooltip } from 'bootstrap-vue';
import { tooltipDelay } from '../../../utils/constants';

export default {
  tooltipDelay,
  components: {
    BTooltip,
  },
  inheritAttrs: false,
};
</script>

<template>
  <b-tooltip v-bind="$attrs" :delay="$options.tooltipDelay" v-on="$listeners">
    <slot></slot>
  </b-tooltip>
</template>
