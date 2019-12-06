<script>
import { newBadgeVariantOptions, newBadgeSizeOptions } from '../../../utils/constants';

export default {
  name: 'GLNewBadge',
  props: {
    variant: {
      type: String,
      required: false,
      default: newBadgeVariantOptions['Neutral average'],
      validator: value => Object.values(newBadgeVariantOptions).includes(value),
    },
    size: {
      type: String,
      required: false,
      default: newBadgeSizeOptions.default,
      validator: value => Object.values(newBadgeSizeOptions).includes(value),
    },
  },
  computed: {
    extraClasses() {
      return [`gl-badge-variant-${this.variant}`, `gl-badge-size-${this.size}`];
    },
  },
};
</script>

<template>
  <span class="gl-badge" :class="extraClasses"><slot></slot></span>
</template>
