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
  <gl-toggle v-model="toggleValue" label="Toggle label" label-position="hidden" is-loading />
</template>
