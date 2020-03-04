<script>
export default {
  data: () => ({
    isInView: false,
  }),
  computed: {
    imageUrl() {
      // If the image is in view, return the high res one. If not return nothing, or a low res one
      return this.isInView
        ? 'https://www.placecage.com/gif/720/405'
        : 'https://www.placecage.com/720/405';
    },
  },
  methods: {
    appear() {
      this.isInView = true;
    },
    disappear() {
      this.isInView = false;
    },
  },
};
</script>

<template>
  <gl-intersection-observer @appear="appear" @disappear="disappear">
    <img :src="imageUrl" />
  </gl-intersection-observer>
</template>
