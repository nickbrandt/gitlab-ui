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
  <b-tooltip v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </b-tooltip>
</template>
