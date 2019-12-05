<script>
export default {
  name: 'GLNewBadge',
  props: {
    variant: {
      type: String,
      required: false,
      default: 'neutral-average',
    },
  },
  computed: {
    extraClasses() {
      return [`gl-badge-variant-${this.variant}`];
    },
  },
};
</script>

<template>
  <span class="gl-badge" :class="extraClasses"><slot></slot></span>
</template>
