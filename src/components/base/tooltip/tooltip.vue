<script>
import BTooltip from 'bootstrap-vue/src/components/tooltip/tooltip';

export default {
  components: {
    BTooltip,
  },
  inheritAttrs: false,
};
</script>

<template>
  <b-tooltip v-bind="$attrs" :delay="{ show: 400 }">
    <slot></slot>
  </b-tooltip>
</template>
