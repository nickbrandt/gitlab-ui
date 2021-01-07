<script>
import { formOptionsMixin } from 'bootstrap-vue/src/mixins/form-options';
import { BFormRadioGroup } from 'bootstrap-vue';
import GlFormRadio from '../form_radio/form_radio.vue';

const { model } = BFormRadioGroup.options;

export default {
  components: {
    BFormRadioGroup,
    GlFormRadio,
  },
  mixins: [formOptionsMixin],
  inheritAttrs: false,
  model,
};
</script>
<template>
  <b-form-radio-group
    class="gl-form-checkbox-group"
    plain
    stacked
    v-bind="$attrs"
    v-on="$listeners"
    @input="$emit('input', $event)"
    @change="$emit('change', $event)"
  >
    <slot name="first"></slot>
    <gl-form-radio
      v-for="(option, idx) in formOptions"
      :key="idx"
      :value="option.value"
      :disabled="option.disabled"
    >
      <!-- eslint-disable-next-line vue/no-v-html -->
      <span v-if="option.html" v-html="option.html"></span>
      <span v-else>{{ option.text }}</span>
    </gl-form-radio>
    <slot></slot>
  </b-form-radio-group>
</template>
