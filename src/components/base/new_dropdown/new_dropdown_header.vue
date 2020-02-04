<script>
import { BDropdownHeader } from 'bootstrap-vue';

export default {
  components: {
    BDropdownHeader,
  },
  inheritAttrs: false,
};
</script>

<template>
  <b-dropdown-header class="gl-new-dropdown-header" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </b-dropdown-header>
</template>
