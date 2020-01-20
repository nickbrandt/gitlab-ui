<script>
import BDropdownItem from 'bootstrap-vue/src/components/dropdown/dropdown-item';
import BDropdownItemButton from 'bootstrap-vue/src/components/dropdown/dropdown-item-button';

export default {
  inheritAttrs: false,
  props: {
    isChecked: {
      type: Boolean,
      isRequired: false,
      default: false,
    },
  },
  computed: {
    bootstrapComponent() {
      return this.$attrs.href ? BDropdownItem : BDropdownItemButton;
    },
  },
};
</script>

<template>
  <component
    :is="bootstrapComponent"
    class="gl-new-dropdown-check-item"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <gl-icon
      name="mobile-issue-close"
      class="gl-new-dropdown-check-item-icon"
      :class="{ invisible: !isChecked }"
    /><slot></slot>
  </component>
</template>
