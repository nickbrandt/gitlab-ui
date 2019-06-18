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
  props: {
    inline: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<template>
   <!-- Setting `d-inline-flex` and `d-flex` should be removed
     when we update to a newer version of bootstrap-vue
     It is due to the fact that bootstrap-vue is making all `plain`
     checkboxes 'inline' and not allowing users to override it 
    -->
  <b-form-checkbox
    plain
    v-bind="$attrs"
    class="gl-form-checkbox"
    :class="[ inline ? 'd-inline-flex' : 'd-flex']"
    :inline="inline"
    @change="$emit('change', $event)"
    @input="$emit('input', $event)"
  >
    <slot></slot>
    <p v-if="Boolean($slots.help)" class="help-text text-secondary mb-0">
      <slot name="help"></slot>
    </p>
  </b-form-checkbox>
</template>
