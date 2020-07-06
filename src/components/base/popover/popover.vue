<script>
import { BPopover } from 'bootstrap-vue';

export default {
  components: {
    BPopover,
  },
  inheritAttrs: false,
  props: {
    cssClasses: {
      type: Array,
      required: false,
      default: () => [],
    },
    placement: {
      type: String,
      required: false,
      default: 'top',
    },
  },
  computed: {
    customClass() {
      return ['gl-popover', ...this.cssClasses].join(' ');
    },
  },
};
</script>

<template>
  <b-popover ref="bPopover" :custom-class="customClass" v-bind="$attrs" v-on="$listeners">
    <template slot="title">
      <slot name="title"></slot>
    </template>
    <slot></slot>
  </b-popover>
</template>
