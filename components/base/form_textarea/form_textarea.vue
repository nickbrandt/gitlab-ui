<script>
import BFormTextarea from 'bootstrap-vue/es/components/form-textarea/form-textarea';

export default {
  components: {
    BFormTextarea,
  },
  inheritAttrs: false,
};
</script>

<template>
  <b-form-textarea
    v-bind="$attrs"
  >
  </b-form-textarea>
</template>
