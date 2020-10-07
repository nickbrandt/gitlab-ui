<script>
import { BDropdownForm } from 'bootstrap-vue';

export default {
  components: {
    BDropdownForm,
  },
  inheritAttrs: false,
};
</script>

<template>
  <b-dropdown-form v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </b-dropdown-form>
</template>
