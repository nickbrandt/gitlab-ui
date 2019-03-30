<script>
import GlPagination from './pagination.vue';

export default {
  components: {
    GlPagination,
  },
  props: {
    change: {
      type: Function,
      required: true,
    },
    page: {
      type: Number,
      required: true,
    },
    hasNextPage: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      currentPage: this.page,
    };
  },
  computed: {
    totalItems() {
      return this.hasNextPage ? this.page + 1 : this.page;
    },
  },
};
</script>

<template>
  <gl-pagination
    :page="currentPage"
    v-bind="$attrs"
    :total-items="totalItems"
    :per-page="1"
    :change="change"
  />
</template>
