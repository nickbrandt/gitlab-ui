<script>
import BPopover from 'bootstrap-vue/src/components/popover/popover';

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
  },
  methods: {
    onPopoverShow() {
      // workaround for appending a custom class to the bs popover which cannot be done via props
      // see https://github.com/bootstrap-vue/bootstrap-vue/issues/1983
      if (this.cssClasses.length > 0) {
        // eslint-disable-next-line no-underscore-dangle
        this.$refs.bPopover._toolpop.getTipElement().classList.add(...this.cssClasses);
      }
    },
  },
};
</script>

<template>
  <b-popover class="gl-popover" ref="bPopover" v-bind="$attrs" @show="onPopoverShow">
    <template slot="title">
      <slot name="title"></slot>
    </template>
    <slot></slot>
  </b-popover>
</template>
