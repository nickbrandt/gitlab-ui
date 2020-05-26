<script>
import { BBadge } from 'bootstrap-vue';
import { badgeSizeOptions, badgeVariantOptions } from '../../../utils/constants';

export default {
  components: {
    BBadge,
  },
  inheritAttrs: false,
  props: {
    size: {
      type: String,
      default: badgeSizeOptions.md,
      validator(value) {
        return badgeSizeOptions[value] !== undefined;
      },
      required: false,
    },
    variant: {
      type: String,
      default: badgeVariantOptions.muted,
      validator(value) {
        return badgeVariantOptions[value] !== undefined;
      },
      required: false,
    },
  },
};
</script>

<template>
  <b-badge v-bind="$attrs" :variant="variant" :class="['gl-badge', size]" pill>
    <slot></slot>
  </b-badge>
</template>
