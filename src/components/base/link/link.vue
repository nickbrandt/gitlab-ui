<script>
import { BLink } from 'bootstrap-vue';
import RelMixin from '../../mixins/rel_mixin';
import { isSafeURL } from '../../../utils/url_utils';

export default {
  components: {
    BLink,
  },
  mixins: [RelMixin],
  inheritAttrs: false,
  computed: {
    hasSafeHref() {
      return isSafeURL(this.$attrs.href);
    },
  },
};
</script>
<template>
  <b-link
    v-if="hasSafeHref"
    v-bind="$attrs"
    :rel="relType"
    :target="target"
    class="gl-link"
    v-on="$listeners"
  >
    <slot></slot>
  </b-link>
  <span v-else><slot></slot></span>
</template>
