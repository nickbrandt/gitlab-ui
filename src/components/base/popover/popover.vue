<script>
import { BPopover } from 'bootstrap-vue';
import tooltipMixin from '../../mixins/tooltip_mixin';

const popoverRefName = 'bPopover';

export default {
  components: {
    BPopover,
  },
  mixins: [tooltipMixin(popoverRefName)],
  inheritAttrs: false,
  props: {
    cssClasses: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  computed: {
    customClass() {
      return ['gl-popover', ...this.cssClasses].join(' ');
    },
  },
  popoverRefName,
};
</script>

<template>
  <b-popover
    :ref="$options.popoverRefName"
    :custom-class="customClass"
    triggers="hover focus"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template slot="title">
      <slot name="title"></slot>
    </template>
    <slot></slot>
  </b-popover>
</template>
