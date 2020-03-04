<script>
export default {
  name: 'GlIntersectionObserver',
  props: {
    options: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  data: () => ({
    observer: null,
  }),
  mounted() {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        this.$emit('appear');
      } else {
        this.$emit('disappear');
      }
    }, this.options);

    this.observer.observe(this.$el);
  },
  destroyed() {
    this.observer.disconnect();
  },
};
</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>
