<script>
import BFormCheckboxGroup from 'bootstrap-vue/es/components/form-checkbox/form-checkbox-group';
import GlFormCheckbox from './form_checkbox.vue';

export default {
  name: 'GlFormCheckboxGroup',
  components: {
    BFormCheckboxGroup,
    GlFormCheckbox,
  },
  inheritAttrs: false,
};
</script>

<template>
  <b-form-checkbox-group v-bind="$attrs">
    <slot></slot>
  </b-form-checkbox-group>
</template>

