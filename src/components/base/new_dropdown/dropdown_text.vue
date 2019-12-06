<script>
import BDropdownText from 'bootstrap-vue/src/components/dropdown/dropdown-text';

export default {
  components: {
    BDropdownText,
  },
  inheritAttrs: false,
};
</script>

<template>
  <b-dropdown-text class="gl-dropdown-text" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </b-dropdown-text>
</template>
