<script>
import BFormRadio from 'bootstrap-vue/src/components/form-radio/form-radio';

export default {
  name: 'GlFormRadio',
  components: { BFormRadio },
  inheritAttrs: false,
};
</script>

<template>
  <b-form-radio plain v-bind="$attrs" class="gl-form-checkbox">
    <slot></slot>
    <p v-if="$slots.help" class="help-text">
      <slot name="help"></slot>
    </p>
  </b-form-radio>
</template>
