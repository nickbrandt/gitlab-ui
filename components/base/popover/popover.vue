<script>
import BPopover from 'bootstrap-vue/src/components/popover/popover';

export default {
  components: {
    BPopover,
  },
  inheritAttrs: false,
};
</script>

<template>
  <b-popover v-bind="$attrs">
    <template slot="title">
      <slot name="title"></slot>
    </template>
    <slot></slot>
  </b-popover>
</template>
