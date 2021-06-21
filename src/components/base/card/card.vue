<script>
export default {
  props: {
    headerClass: {
      type: [String, Object, Array],
      required: false,
      default: '',
    },
    bodyClass: {
      type: [String, Object, Array],
      required: false,
      default: '',
    },
    footerClass: {
      type: [String, Object, Array],
      required: false,
      default: '',
    },
  },
};
</script>

<template>
  <div class="gl-card">
    <div v-if="$slots.header" class="gl-card-header" :class="headerClass">
      <slot name="header"></slot>
    </div>
    <div class="gl-card-body" :class="bodyClass">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="gl-card-footer" :class="footerClass">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
