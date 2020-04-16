<script>
export default {
  props: {
    headerClass: {
      type: String,
      required: false,
      default: '',
    },
    bodyClass: {
      type: String,
      required: false,
      default: '',
    },
    footerClass: {
      type: String,
      required: false,
      default: '',
    },
  },
};
</script>

<template>
  <div class="gl-new-card">
    <div v-if="this.$slots.header" class="gl-new-card-header" :class="headerClass">
      <slot name="header"></slot>
    </div>
    <div class="gl-new-card-body" :class="bodyClass">
      <slot></slot>
    </div>
    <div v-if="this.$slots.footer" class="gl-new-card-footer" :class="footerClass">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
