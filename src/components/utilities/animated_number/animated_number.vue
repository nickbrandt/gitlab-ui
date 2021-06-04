<script>
export default {
  name: 'AnimatedNumber',
  props: {
    number: {
      type: Number,
      required: true,
    },
    /**
     * Controls how long it takes for the animation to complete.
     */
    duration: {
      type: Number,
      required: false,
      default: 2000,
    },
    /**
     * Controls the number of decimal places displayed in the output.
     */
    decimalPlaces: {
      type: Number,
      required: false,
      default: 0,
    },
    animateOnMount: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      displayNumber: 0,
      startTime: null,
    };
  },
  computed: {
    animatedNumber() {
      return this.displayNumber.toFixed(this.decimalPlaces);
    },
  },
  ready() {
    this.displayNumber = this.number ? this.number : 0;
  },
  watch: {
    number() {
      window.requestAnimationFrame(this.count);
    },
  },
  mounted() {
    if (this.animateOnMount) {
      window.requestAnimationFrame(this.count);
    } else {
      this.displayNumber = this.number;
    }
  },
  methods: {
    count(timestamp) {
      if (!this.startTime) {
        this.startTime = timestamp;
      }

      const progress = timestamp - this.startTime;

      if (progress < this.duration) {
        if (this.displayNumber !== this.number) {
          const change = (this.number - this.displayNumber) / (this.duration / 100);
          this.displayNumber += change;
        }
        window.requestAnimationFrame(this.count);
      } else {
        this.displayNumber = this.number; // Ensures that the final number is accurate.
        this.startTime = null;
      }
    },
  },
};
</script>
<template>
  <span>{{ animatedNumber }}</span>
</template>
