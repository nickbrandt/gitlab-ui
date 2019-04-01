<script>
import _ from 'lodash';
import { GlTooltipDirective } from '../../../index';

export default {
  directives: {
    GlTooltip: GlTooltipDirective,
  },
  props: {
    boundary: {
      type: String,
      required: false,
      default: 'viewport',
    },
    placement: {
      type: String,
      required: false,
      default: 'top',
    },
    title: {
      type: String,
      required: false,
      default: '',
    },
    truncateTarget: {
      type: [String, Function],
      required: false,
      default: 'child',
    },
  },
  data() {
    return {
      showTooltip: false,
    };
  },
  mounted() {
    const target = this.selectTarget();
    if (target && target.scrollWidth > target.offsetWidth) {
      this.showTooltip = true;
    }
  },
  methods: {
    selectTarget() {
      if (_.isFunction(this.truncateTarget)) {
        return this.truncateTarget(this.$el);
      } else if (this.truncateTarget === 'child') {
        const child = this.$el.childNodes[0];

        // We can't test dimensions of a TEXT_NODE, so default to the current element
        return child.nodeType === Node.TEXT_NODE ? this.$el : child;
      }

      return this.$el;
    },
  },
};
</script>

<template>
  <span
    v-if="showTooltip"
    v-gl-tooltip="{ boundary, placement }"
    :title="title"
    class="js-show-tooltip"
  >
    <slot></slot>
  </span>
  <span v-else> <slot></slot> </span>
</template>
