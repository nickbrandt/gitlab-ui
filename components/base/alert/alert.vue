<script>
import BAlert from 'bootstrap-vue/es/components/alert/alert';

export default {
  components: {
    BAlert,
  },
  props: {
    show: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
};
</script>
<template>
  <b-alert v-bind="$attrs" :show="show" v-on="$listeners">
    <slot></slot>
  </b-alert>
</template>
