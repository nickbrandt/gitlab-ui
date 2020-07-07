<script>
import formOptionsMixin from 'bootstrap-vue/src/mixins/form-options';
import { BFormCheckboxGroup } from 'bootstrap-vue';
import GlFormCheckbox from './form_checkbox.vue';

export default {
  name: 'GlFormCheckboxGroup',
  components: { BFormCheckboxGroup, GlFormCheckbox },
  mixins: [formOptionsMixin],
  inheritAttrs: false,
  model: {
    prop: 'checked',
    event: 'input',
  },
};
</script>

<template>
  <div>
    <b-form-checkbox-group
      v-bind="$attrs"
      class="gl-form-checkbox-group"
      plain
      stacked
      @change="$emit('change', $event)"
      @input="$emit('input', $event)"
    >
      <slot name="first"></slot>
      <gl-form-checkbox
        v-for="(option, idx) in formOptions"
        :key="idx"
        :value="option.value"
        :disabled="option.disabled"
      >
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span v-if="option.html" v-html="option.html"></span>
        <span v-else>{{ option.text }}</span>
      </gl-form-checkbox>
      <slot></slot>
    </b-form-checkbox-group>
  </div>
</template>
