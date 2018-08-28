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
    page: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    totalRows: {
      type: Number,
      required: true,
    },
    limits: {
      type: Object,
      require: false,
      default: function () {
        return {
          xs: 1,
          sm: 3,
          md: 5,
        }
      },
    }
  },
  data: () => ({
    breakpoint: Breakpoints.getBreakpointSize(),
    currentPage: null,
  }),
  computed: {
    hideGotoEndButtons() {
      const totalPages = Math.ceil(this.totalRows / this.perPage);
      return totalPages < this.paginationLimit;
    },
    paginationLimit() {
      return this.limits[this.breakpoint] || this.limits.default || 11;
    }
  },
  methods: {
    setBreakpoint() {
      this.breakpoint = Breakpoints.getBreakpointSize();
    }
  },
  created() {
    this.currentPage = this.page;
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
    :per-page="perPage"
    :total-rows="totalRows"
    :hide-goto-end-buttons="hideGotoEndButtons"
    v-model="currentPage"
  />
</template>
