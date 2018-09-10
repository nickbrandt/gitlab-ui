<script>
import BAlert from 'bootstrap-vue/es/components/alert/alert'

export default {
  components: {
    BAlert
  },
};
</script>
<template>
  <b-alert
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot></slot>
  </b-alert>
</template>
