<script>
import { BLink } from 'bootstrap-vue';
import RelMixin from '../../mixins/rel_mixin';

export default {
  components: {
    BLink,
  },
  mixins: [RelMixin],
};
</script>
<template>
  <b-link v-bind="$attrs" :rel="relType" :target="target" class="gl-link" v-on="$listeners">
    <slot></slot>
  </b-link>
</template>
