<script>
export default {
  data() {
    return {
      width: 0,
      height: 0,
    };
  },
  methods: {
    handleResize({ contentRect: { width, height } }) {
      this.width = width;
      this.height = height;
    },
  },
};
</script>
<template>
  <div v-gl-resize-observer-directive="handleResize">
    <p>{{ width }} x {{ height }}</p>
  </div>
</template>
