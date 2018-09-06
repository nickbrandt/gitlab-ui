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
    totalItems: {
      type: Number,
      required: true,
    },
    limits: {
      type: Object,
      require: false,
      default: () => ({
        xs: 1,
        sm: 3,
        md: 5,
      }),
    }
  },
  data() {
    return {
      breakpoint: Breakpoints.getBreakpointSize(),
      currentPage: this.page,
    };
  },
  computed: {
    hideGotoEndButtons() {
      const totalPages = Math.ceil(this.totalItems / this.perPage);
      return totalPages < this.paginationLimit;
    },
    paginationLimit() {
      return this.limits[this.breakpoint] || this.limits.default || 11;
    }
  },
  watch: {
    currentPage: 'change',
  },
  created() {
    window.addEventListener('resize', this.setBreakpoint);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setBreakpoint);
  },
  methods: {
    setBreakpoint() {
      this.breakpoint = Breakpoints.getBreakpointSize();
    }
  },
};
</script>

<template>
  <b-pagination
    v-bind="this.$attrs"
    :limit="paginationLimit"
    :per-page="perPage"
    :total-rows="totalItems"
    :hide-goto-end-buttons="hideGotoEndButtons"
    v-model="currentPage"
  />
</template>
