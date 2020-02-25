<script>
const LAST_PAGE = 3;

export default {
  lastPage: LAST_PAGE,
  data: () => ({
    page: 1,
  }),
  computed: {
    prevPage() {
      return Math.max(this.page - 1, 0);
    },
    nextPage() {
      const nextPage = this.page + 1;
      return nextPage > LAST_PAGE ? 0 : nextPage;
    },
  },
};
</script>

<template>
  <div class="text-center">
    <gl-pagination
      v-model="page"
      :prev-page="prevPage"
      :next-page="nextPage"
      prev-text="Prev"
      next-text="Next"
      align="center"
    />
    Page {{ page }} of {{ $options.lastPage }}
  </div>
</template>
