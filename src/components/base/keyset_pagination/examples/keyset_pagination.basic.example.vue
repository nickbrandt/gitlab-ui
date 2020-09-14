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
  <gl-keyset-pagination v-bind="pageInfo" />
</template>
