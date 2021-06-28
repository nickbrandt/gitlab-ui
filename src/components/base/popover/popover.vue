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
    triggers: {
      type: String,
      required: false,
      default: 'hover focus',
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
    :triggers="triggers"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <template slot="title">
      <slot name="title"></slot>
    </template>
    <slot></slot>
  </b-popover>
</template>
