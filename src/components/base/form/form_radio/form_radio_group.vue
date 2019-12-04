<script>
import formOptionsMixin from 'bootstrap-vue/src/mixins/form-options';
import BFormRadioGroup from 'bootstrap-vue/src/components/form-radio/form-radio-group';
import GlFormRadio from './form_radio.vue';

export default {
  components: {
    BFormRadioGroup,
    GlFormRadio,
  },
  mixins: [formOptionsMixin],
  inheritAttrs: false,
};
</script>
<template>
  <b-form-radio-group
    v-bind="$attrs"
    class="gl-form-checkbox-group"
    plain
    @change="$emit('change', $event)"
    v-on="$listeners"
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
