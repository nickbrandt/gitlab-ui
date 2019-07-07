<script>
import GlLink from '../link/link.vue';
import GlTooltip from '../tooltip/tooltip.vue';
import GlBadge from '../badge/badge.vue';

export default {
  components: {
    GlLink,
    GlTooltip,
    GlBadge,
  },
  props: {
    color: {
      type: String,
      required: true,
    },
    backgroundColor: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      required: false,
      default: '',
    },
    description: {
      type: String,
      required: false,
      default: '',
    },
    size: {
      type: String,
      required: false,
      default: '',
    },
    variant: {
      type: String,
      required: false,
      default: '',
    },
  },
  computed: {
    cssClasses() {
      return [
        this.size === 'sm' ? 'gl-label-sm' : '',
        'gl-label',
        this.variant ? `gl-label-${this.variant}` : '',
      ];
    },
    labelTarget() {
      return this.target || '#';
    },
  },
};
</script>

<template>
  <gl-badge
    :class="cssClasses"
    :style="{backgroundColor}"
    pill
    v-bind="$attrs"
    @click="$emit('click', $event)"
  >
  <gl-link :href="labelTarget" :style="{color}" class="js-label-wrapper text-decoration-none">
      <span :ref="'labelTitleRef'"><slot></slot></span>
      <gl-tooltip v-if="description" :target="() => $refs.labelTitleRef" class="js-label-desc" placement="top" boundary="viewport">
        {{ description }}
      </gl-tooltip>
    </gl-link>
  </gl-badge>
</template>
