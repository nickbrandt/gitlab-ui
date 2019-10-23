<script>
export default {
  data: () => ({
    page: 15,
  }),
};
</script>

<template>
  <gl-pagination v-model="page" :per-page="10" :total-items="300" />
</template>
