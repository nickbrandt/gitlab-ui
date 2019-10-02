<script>
export default {
  data() {
    return {
      toggleValue: false,
    };
  },
};
</script>

<template>
  <gl-toggle v-model="toggleValue" is-loading />
</template>
