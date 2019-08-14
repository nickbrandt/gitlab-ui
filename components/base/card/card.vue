<script>
import BCard from 'bootstrap-vue/src/components/card';

export default {
  components: {
    BCard,
  },
};
</script>
<template>
  <b-button-group
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot></slot>
  </b-button-group>
</template>
