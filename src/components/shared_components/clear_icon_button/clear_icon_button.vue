<script>
import GlIcon from '../../base/icon/icon.vue';
import GlTooltip from '../../../directives/tooltip';

export default {
  components: {
    GlIcon,
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
      validator: value =>
        value === false || typeof value === 'string' || value instanceof HTMLElement,
    },
  },
};
</script>

<template>
  <button
    v-gl-tooltip.hover="{ container: tooltipContainer }"
    class="gl-clear-icon-button"
    name="clear"
    :title="title"
    type="button"
    aria-label="Clear"
    v-on="$listeners"
  >
    <gl-icon name="clear" />
  </button>
</template>
