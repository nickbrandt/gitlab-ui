<script>
import BBadge from 'bootstrap-vue/es/components/badge/badge';

export default {
  components: {
    BBadge,
  },
  inheritAttrs: false,
  props: {
    pipeline: {
      type: Boolean,
      required: false,
      default: false
    }
  }
};
</script>

<template>
  <b-badge v-bind="$attrs">
    <svg v-if="pipeline"></svg>
    <span>
      <slot></slot>
    </span>
  </b-badge>
</template>
