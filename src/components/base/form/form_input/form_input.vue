<script>
import { BFormInput } from 'bootstrap-vue';
import { formInputSizes } from '../../../../utils/constants';

export default {
  components: {
    BFormInput,
  },
  inheritAttrs: false,
  props: {
    size: {
      type: String,
      required: false,
      default: null,
      validator: value => Object.values(formInputSizes).includes(value),
    },
  },
  computed: {
    cssClasses() {
      return {
        [`gl-form-input-${this.size}`]: this.size !== null,
      };
    },
  },
};
</script>

<template>
  <b-form-input class="gl-form-input" :class="cssClasses" v-bind="$attrs" v-on="$listeners" />
</template>
