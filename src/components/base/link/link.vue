<script>
import { BLink } from 'bootstrap-vue';
import RelMixin from '../../mixins/rel_mixin';
import SafeLink from '../../../directives/safe_link/safe_link';

export default {
  components: {
    BLink,
  },
  directives: {
    SafeLink,
  },
  mixins: [RelMixin],
};
</script>
<template>
  <b-link
    v-safe-link
    v-bind="$attrs"
    :rel="relType"
    :target="target"
    class="gl-link"
    v-on="$listeners"
  >
    <slot></slot>
  </b-link>
</template>
