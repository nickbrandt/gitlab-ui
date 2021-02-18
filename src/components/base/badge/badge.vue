<script>
import { BBadge } from 'bootstrap-vue';
import { badgeSizeOptions, badgeVariantOptions } from '../../../utils/constants';
import GlIcon from '../icon/icon.vue';

export default {
  components: {
    BBadge,
    GlIcon,
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
    icon: {
      type: String,
      required: false,
      default: null,
    },
  },
  computed: {
    hasIconOnly() {
      return Object.keys(this.$slots).length === 0 && this.icon;
    },
  },
};
</script>

<template>
  <b-badge v-bind="$attrs" :variant="variant" :class="['gl-badge', size]" pill>
    <gl-icon v-if="icon" class="gl-badge-icon" :class="{ 'gl-mr-2': !hasIconOnly }" :name="icon" />
    <slot></slot>
  </b-badge>
</template>
