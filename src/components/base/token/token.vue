<script>
export default {
  props: {
    viewOnly: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    close($event) {
      this.$emit('close', $event);
    },
  },
};
</script>

<template>
  <span class="gl-token">
    <span class="gl-token-content">
      <slot></slot>
      <i v-if="!viewOnly" class="gl-token-close fa fa-close" @click="close($event)"></i>
    </span>
  </span>
</template>
