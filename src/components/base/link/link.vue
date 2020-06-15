<script>
import { BLink } from 'bootstrap-vue';
import SafeLink from '../../../directives/safe_link/safe_link';

export default {
  components: {
    BLink,
  },
  directives: {
    SafeLink,
  },
  props: {
    // This is necessary to prevent vue-bootstrap to set
    // a target="_self" when there is no target attribute
    target: {
      type: String,
      required: false,
      default: null,
    },
  },
};
</script>
<template>
  <b-link v-safe-link v-bind="$attrs" :target="target" class="gl-link" v-on="$listeners">
    <slot></slot>
  </b-link>
</template>
