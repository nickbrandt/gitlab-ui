<script>
import BFormRadioGroup from 'bootstrap-vue/es/components/form-radio/form-radio-group';

export default {
  components: {
    BFormRadioGroup,
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
  <b-form-radio-group
    :plain="plain"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot slot="first" name="first"></slot>
    <slot></slot>
  </b-form-radio-group>
</template>
