<script>
import { BTooltip } from 'bootstrap-vue';

export default {
  components: {
    BTooltip,
  },
  inheritAttrs: false,
};
</script>

<template>
  <b-tooltip v-bind="$attrs">
    <slot></slot>
  </b-tooltip>
</template>
