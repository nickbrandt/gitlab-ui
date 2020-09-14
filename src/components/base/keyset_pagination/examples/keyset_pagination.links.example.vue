<script>
export default {
  data() {
    return {
      pageInfo: {
        hasPreviousPage: true,
        hasNextPage: true,
      },
    };
  },
};
</script>

<template>
  <gl-keyset-pagination
    v-bind="pageInfo"
    prev-button-link="https://example.com/prev"
    next-button-link="https://example.com/next"
  />
</template>
