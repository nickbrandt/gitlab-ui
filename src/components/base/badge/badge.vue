<script>
import { BBadge } from 'bootstrap-vue';

export default {
  components: {
    BBadge,
  },
  inheritAttrs: false,
};
</script>

<template>
  <b-badge v-bind="$attrs">
    <slot></slot>
  </b-badge>
</template>
