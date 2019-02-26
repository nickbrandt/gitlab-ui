<script>
import BFormRadioGroup from 'bootstrap-vue/es/components/form-radio/form-radio-group';

export default {
  components: {
    BFormRadioGroup,
  },
  props: {
    plain: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  inheritAttrs: false,
};
</script>
<template>
  <b-form-radio-group
    v-bind="$attrs"
    v-on="$listeners"
    :plain="plain"
  >
    <slot name="first" slot="first"></slot>
    <slot></slot>
  </b-form-radio-group>
</template>
