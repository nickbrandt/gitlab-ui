<script>
import BFormRadioGroup from 'bootstrap-vue/es/components/form-radio/form-radio-group';

export default {
  components: {
    BFormRadioGroup,
  },
  inheritAttrs: false,
};
</script>
<template>
  <b-form-radio-group v-bind="$attrs" v-on="$listeners">
    <slot v-for="slot in Object.keys($slots)" :slot="slot" :name="slot"></slot>
  </b-form-radio-group>
</template>
