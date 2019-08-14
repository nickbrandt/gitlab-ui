<script>
import BCard from 'bootstrap-vue/src/components/card/card';

export default {
  components: {
    BCard,
  },
  inheritAttrs: false,
};
</script>

<template>
  <b-card v-bind="$attrs">
    <slot></slot>
  </b-card>
</template>
