<script>
import BFormInput from 'bootstrap-vue/src/components/form-input/form-input';

export default {
  components: {
    BFormInput,
  },
  inheritAttrs: false,
};
</script>

<template>
  <b-form-input class="gl-form-input" v-bind="$attrs" v-on="$listeners" />
</template>
