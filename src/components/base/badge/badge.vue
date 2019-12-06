<script>
import BBadge from 'bootstrap-vue/src/components/badge/badge';

const sizes = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

const modifiers = {
  soft: 'soft',
  average: 'average',
  loud: 'loud',
};

const variants = {
  neutral: 'neutral',
  info: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
};

export default {
  components: {
    BBadge,
  },
  inheritAttrs: false,
  props: {
    size: {
      type: String,
      default: sizes.md,
      validator(value) {
        return sizes[value] !== undefined;
      },
    },
    modifier: {
      type: String,
      default: modifiers.average,
      validator(value) {
        return modifiers[value] !== undefined;
      },
    },
    variant: {
      type: String,
      default: 'neutral',
      validator(value) {
        return variants[value] !== undefined;
      },
    },
    fontWeightNormal: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<template>
  <b-badge
    v-bind="$attrs"
    :variant="variant"
    :class="['gl-badge', size, modifier, { normal: fontWeightNormal }]"
    :pill="true"
  >
    <slot></slot>
  </b-badge>
</template>
