<script>
import BButton from 'bootstrap-vue/src/components/button/button';
import RelMixin from '../../mixins/rel_mixin';

export default {
  components: {
    BButton,
  },
  mixins: [RelMixin],
  props: {
    newStyle: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>
<template>
  <b-button
    v-bind="$attrs"
    :rel="relType"
    :target="target"
    :class="{ 'gl-button': newStyle }"
    v-on="$listeners"
  >
    <slot></slot>
  </b-button>
</template>
