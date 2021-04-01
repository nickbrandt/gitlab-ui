<script>
import { BFormInvalidFeedback } from 'bootstrap-vue';

export default {
  components: {
    BFormInvalidFeedback,
  },
  inheritAttrs: false,
};
</script>

<template>
  <b-form-invalid-feedback v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </b-form-invalid-feedback>
</template>
