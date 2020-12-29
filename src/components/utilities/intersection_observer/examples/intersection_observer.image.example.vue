<script>
export default {
  data: () => ({
    isInView: false,
  }),
  computed: {
    imageUrl() {
      // If the image is in view, return the high res one. If not return nothing, or a low res one
      return this.isInView
        ? '../../img/gitlab-summit-south-africa.jpg'
        : '../../img/gitlab-summit-south-africa-min.jpg';
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
    <img :src="imageUrl" style="max-width: 100%; height: auto" />
  </gl-intersection-observer>
</template>
