<script>
export default {
  data: () => ({
    page: 2,
  }),
};
</script>

<template>
  <gl-pagination
    v-model="page"
    :per-page="10"
    :total-items="100"
    :link-gen="(page) => `#page${page}`"
  />
</template>
