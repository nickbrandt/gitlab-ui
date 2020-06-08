<script>
export default {
  data() {
    return {
      open: false,
    };
  },
  methods: {
    handleClick() {
      this.open = !this.open;
    },
  },
};
</script>

<template>
  <div>
    <button @click="handleClick">Toggle</button>
    <gl-slide-down>
      <div v-if="open">
        Hello World!
      </div>
    </gl-slide-down>
  </div>
</template>
