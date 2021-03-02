<script>
import { BFormRadio } from 'bootstrap-vue';

const { model } = BFormRadio.options;

export default {
  name: 'GlFormRadio',
  components: { BFormRadio },
  inheritAttrs: false,
  model,
};
</script>

<template>
  <b-form-radio
    class="gl-form-radio"
    v-bind="$attrs"
    v-on="$listeners"
    @input="$emit('input', $event)"
    @change="$emit('change', $event)"
  >
    <slot></slot>
    <p v-if="$scopedSlots.help" class="help-text">
      <slot name="help"></slot>
    </p>
  </b-form-radio>
</template>
