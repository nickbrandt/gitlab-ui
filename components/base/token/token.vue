<script>
export default {
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
      <i class="gl-token-close fa fa-close" @click="close($event)"></i>
    </span>
  </span>
</template>
