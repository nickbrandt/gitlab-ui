<script>
import BFormCheckbox from 'bootstrap-vue/es/components/form-checkbox/form-checkbox';

export default {
  name: 'GlFormCheckbox',
  components: {
    BFormCheckbox,
  },
  inheritAttrs: false,
  model: {
    prop: 'checked',
    event: 'input',
  },
};
</script>

<template>
  <b-form-checkbox
    plain
    v-bind="$attrs"
    @change="$emit('change', $event)"
    @input="$emit('input', $event)"
  >
    <slot></slot>
  </b-form-checkbox>
</template>
