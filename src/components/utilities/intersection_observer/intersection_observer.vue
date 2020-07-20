<script>
import { memoize } from 'lodash';

const getObserver = memoize(
  options =>
    new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.target.$_gl_intersectionHandler(entry);
      });
    }, options || {})
);

export default {
  name: 'GlIntersectionObserver',
  props: {
    options: {
      type: Object,
      required: false,
      default: null,
    },
  },
  mounted() {
    const observer = getObserver(this.options);

    this.$el.$_gl_intersectionHandler = entry => {
      this.$emit('update', entry);

      if (entry.isIntersecting) {
        this.$emit('appear');
      } else {
        this.$emit('disappear');
      }
    };
    this.$el.$_gl_intersectionObserver = observer;

    observer.observe(this.$el);
  },
  destroyed() {
    this.$el.$_gl_intersectionObserver.unobserve(this.$el);
    delete this.$el.$_gl_intersectionHandler;
    delete this.$el.$_gl_intersectionObserver;
  },
  // Expose getObserver method for tests
  getObserver,
};
</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>
