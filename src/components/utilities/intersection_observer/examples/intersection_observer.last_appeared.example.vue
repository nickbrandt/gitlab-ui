<script>
export default {
  data: () => ({
    appearedAt: null,
    now: null,
    interval: null,
  }),
  computed: {
    secondsSinceAppearance() {
      if (!this.appearedAt) {
        return 0;
      }
      return Math.floor((this.now - this.appearedAt) / 1000);
    },
  },
  destroyed() {
    this.clearInterval();
  },
  methods: {
    appear() {
      this.clearInterval();
      this.interval = setInterval(this.tick, 1000);
      this.tick();
      this.appearedAt = this.now;
    },
    disappear() {
      this.clearInterval();
    },
    clearInterval() {
      clearInterval(this.interval);
    },
    tick() {
      this.now = new Date().getTime();
    },
  },
};
</script>

<template>
  <gl-intersection-observer @appear="appear" @disappear="disappear">
    <span>Last appeared {{ secondsSinceAppearance }} seconds ago</span>
  </gl-intersection-observer>
</template>
