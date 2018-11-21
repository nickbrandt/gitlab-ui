<script>
import BFormInput from 'bootstrap-vue/es/components/form-input/form-input';

export default {
  components: {
    BFormInput,
  },
  inheritAttrs: false,
};
</script>

<template>
  <b-form-input v-bind="$attrs">
    <slot></slot>
  </b-form-input>
</template>
