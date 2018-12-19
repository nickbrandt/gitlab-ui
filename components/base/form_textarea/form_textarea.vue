<script>
import BFormTextarea from 'bootstrap-vue/es/components/form-textarea/form-textarea';

export default {
  components: {
    BFormTextarea,
  },
  // This prop is needed to map the v-model correctly
  // https://alligator.io/vuejs/add-v-model-support/
  props: ['value'],
  inheritAttrs: false,
};
</script>

<template>
  <b-form-textarea
    v-bind="$attrs"
    v-on="$listeners"
    :value="value"
  />
</template>
