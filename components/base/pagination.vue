<script>
/**
 * Based on Bootstrap Vue's Pagination and Pagination Nav components
 * all Bootstrap Vue attributes will work on this component:
 * https://bootstrap-vue.js.org/docs/components/pagination
 * https://bootstrap-vue.js.org/docs/components/pagination-nav
 */
import bPagination from 'bootstrap-vue/es/components/pagination/pagination';
import bPaginationNav from 'bootstrap-vue/es/components/pagination-nav/pagination-nav';

export default {
  components: {
    bPagination,
    bPaginationNav
  },
  computed: {
    defaultAttrs () {
      return {
        limit: 11
      }
    },
    isTypeNav () {
      return typeof this.$attrs['link-gen'] === 'function'
    },
    mergedAttrs () {
      for (const attr in this.defaultAttrs) {
        if (!this.$attrs[attr]) {
          this.$attrs[attr] = this.defaultAttrs[attr]
        }
      }
      if (!this.$attrs['hide-goto-end-buttons']) {
        this.$attrs['hide-goto-end-buttons'] = this.$attrs['number-of-pages'] < this.$attrs.limit
      }
      return this.$attrs
    },
    pagination () {
      return this.isTypeNav
        ? bPaginationNav
        : bPagination
    }
  },
};
</script>

<template>
  <component
    :is="pagination"
    v-bind="mergedAttrs"
  />
</template>
