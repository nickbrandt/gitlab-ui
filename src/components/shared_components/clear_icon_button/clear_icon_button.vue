<script>
import GlTooltip from '../../../directives/tooltip';
import GlButton from '../../base/button/button.vue';

export default {
  components: {
    GlButton,
  },
  directives: {
    GlTooltip,
  },
  props: {
    title: {
      type: String,
      required: false,
      default: 'Clear',
    },
    tooltipContainer: {
      required: false,
      default: false,
      validator: (value) =>
        value === false || typeof value === 'string' || value instanceof HTMLElement,
    },
  },
};
</script>

<template>
  <gl-button
    v-gl-tooltip.hover="{ container: tooltipContainer }"
    variant="default"
    category="tertiary"
    class="gl-clear-icon-button"
    size="small"
    name="clear"
    :title="title"
    icon="clear"
    aria-label="Clear"
    v-on="$listeners"
  />
</template>
