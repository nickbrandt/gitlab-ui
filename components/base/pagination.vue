<script>
import BPagination from "bootstrap-vue/es/components/pagination/pagination";
import Breakpoints from "../../helpers/breakpoints.js";

export default {
  components: {
    BPagination
  },
  props: {
    change: {
      type: Function,
      required: true,
    },
    pageInfo: {
      type: Object,
      required: true,
    }
  },
  data: () => ({
    breakpoint: Breakpoints.getBreakpointSize(),
    currentPage: null,
  }),
  computed: {
    hideGotoEndButtons() {
      const totalPages = Math.ceil(this.pageInfo.total / this.pageInfo.perPage);
      return totalPages < this.paginationLimit;
    },
    paginationLimit() {
      switch (this.breakpoint) {
        case "xs":
          return 1;
        case "sm":
          return 3;
        case "md":
          return 5;
        default:
          return 11;
      }
    }
  },
  methods: {
    setBreakpoint() {
      this.breakpoint = Breakpoints.getBreakpointSize();
    }
  },
  created() {
    this.currentPage = this.pageInfo.page;
    this.$watch('currentPage', this.change);

    window.addEventListener("resize", this.setBreakpoint);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.setBreakpoint);
  }
};
</script>

<template>
  <BPagination
    v-bind="this.$attrs"
    :limit="paginationLimit"
    :per-page="pageInfo.perPage"
    :total-rows="pageInfo.total"
    :hide-goto-end-buttons="hideGotoEndButtons"
    v-model="currentPage"
  />
</template>
