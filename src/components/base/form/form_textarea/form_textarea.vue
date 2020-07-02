<script>
import { BFormTextarea } from 'bootstrap-vue';

export default {
  components: {
    BFormTextarea,
  },
  inheritAttrs: false,
  props: {
    // This prop is needed to map the v-model correctly
    // https://alligator.io/vuejs/add-v-model-support/
    value: {
      type: String,
      required: false,
      default: '',
    },
    noResize: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
};
</script>

<template>
  <b-form-textarea
    class="gl-form-input gl-form-textarea"
    :no-resize="noResize"
    v-bind="$attrs"
    :value="value"
    v-on="$listeners"
  />
</template>
