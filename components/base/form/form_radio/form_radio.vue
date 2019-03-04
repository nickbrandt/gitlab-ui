<script>
import BFormRadio from 'bootstrap-vue/es/components/form-radio/form-radio';

export default {
  components: {
    BFormRadio,
  },
  inheritAttrs: false,
  props: {
    plain: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
};
</script>

<template>
  <b-form-radio v-bind="$attrs">
    <slot></slot>
  </b-form-radio>
</template>
