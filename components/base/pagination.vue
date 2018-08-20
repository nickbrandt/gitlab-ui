<script>
/**
 * Based on Bootstrap Vue's Pagination and Pagination Nav components
 * all Bootstrap Vue attributes will work on this component:
 * https://bootstrap-vue.js.org/docs/components/pagination
 * https://bootstrap-vue.js.org/docs/components/pagination-nav
 */
import BPaginationNav from "bootstrap-vue/es/components/pagination-nav/pagination-nav";
import Breakpoints from "../../helpers/breakpoints.js";

export default {
  components: {
    BPaginationNav
  },
  data: () => ({
    breakpoint: Breakpoints.getBreakpointSize()
  }),
  computed: {
    defaultAttrs() {
      return {
        limit: this.paginationLimit
      };
    },
    mergedAttrs() {
      for (const attr in this.defaultAttrs) {
        if (!this.$attrs[attr]) {
          this.$attrs[attr] = this.defaultAttrs[attr];
        }
      }
      if (!this.$attrs["hide-goto-end-buttons"]) {
        this.$attrs["hide-goto-end-buttons"] =
          this.$attrs["number-of-pages"] < this.$attrs.limit;
      }
      return this.$attrs;
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
    window.addEventListener("resize", this.setBreakpoint);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.setBreakpoint);
  }
};
</script>

<template>
  <BPaginationNav v-bind="mergedAttrs" />
</template>
