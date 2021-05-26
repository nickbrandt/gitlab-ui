<script>
import debounce from 'lodash/debounce';
import isFunction from 'lodash/isFunction';
import range from 'lodash/range';
import Breakpoints, { breakpoints } from '../../../utils/breakpoints';
import { alignOptions, resizeDebounceTime } from '../../../utils/constants';
import GlIcon from '../icon/icon.vue';
import GlLink from '../link/link.vue';

const pageRange = (from, to) => range(from, to + 1, 1);

export default {
  name: 'Pagination',
  components: {
    GlLink,
    GlIcon,
  },
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: {
      type: Number,
      required: false,
      default: 1,
      validator: (x) => x > 0,
    },
    perPage: {
      type: Number,
      required: false,
      default: 20,
      validator: (x) => x > 0,
    },
    totalItems: {
      type: Number,
      required: false,
      default: 0,
    },
    limits: {
      type: Object,
      required: false,
      default: () => ({
        xs: 0,
        sm: 3,
        md: 9,
        default: 9,
      }),
      validator: (value) => {
        const missingSizes = Object.keys(breakpoints).filter((size) => !value[size]).length;
        return missingSizes === 0 ? true : value.default;
      },
    },
    linkGen: {
      type: Function,
      required: false,
      default: null,
    },
    prevPage: {
      type: Number,
      required: false,
      default: null,
    },
    prevText: {
      type: String,
      required: false,
      default: 'Prev',
    },
    nextPage: {
      type: Number,
      required: false,
      default: null,
    },
    nextText: {
      type: String,
      required: false,
      default: 'Next',
    },
    ellipsisText: {
      type: String,
      required: false,
      default: '…',
    },
    labelFirstPage: {
      type: String,
      required: false,
      default: 'Go to first page',
    },
    labelPrevPage: {
      type: String,
      required: false,
      default: 'Go to previous page',
    },
    labelNextPage: {
      type: String,
      required: false,
      default: 'Go to next page',
    },
    labelLastPage: {
      type: String,
      required: false,
      default: 'Go to last page',
    },
    labelPage: {
      type: Function,
      required: false,
      default: (page) => `Go to page ${page}`,
    },
    align: {
      type: String,
      required: false,
      default: alignOptions.left,
      validator: (value) => Object.keys(alignOptions).includes(value),
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      breakpoint: Breakpoints.getBreakpointSize(),
      // If total pages count is below or equal to minTotalPagesToCollapse, collapsing is disabled
      minTotalPagesToCollapse: 4,
    };
  },
  computed: {
    isVisible() {
      return this.totalPages > 1 || this.isCompactPagination;
    },
    isLinkBased() {
      return isFunction(this.linkGen);
    },
    paginationLimit() {
      return typeof this.limits[this.breakpoint] !== 'undefined'
        ? this.limits[this.breakpoint]
        : this.limits.default;
    },
    maxAdjacentPages() {
      return Math.max(Math.ceil((this.paginationLimit - 1) / 2), 0);
    },
    totalPages() {
      return Math.ceil(this.totalItems / this.perPage);
    },
    isFillAlign() {
      return this.align === alignOptions.fill;
    },
    wrapperClasses() {
      const classes = [];
      if (this.align === alignOptions.center) {
        classes.push('justify-content-center');
      }
      if (this.align === alignOptions.right) {
        classes.push('justify-content-end');
      }
      if (this.isFillAlign) {
        classes.push('text-center');
      }
      return classes;
    },
    shouldCollapseLeftSide() {
      const diff = this.value - this.maxAdjacentPages;

      // Magic 3: prevents collapsing a single page on the left side
      return (
        diff >= this.maxAdjacentPages && diff > 3 && this.totalPages > this.minTotalPagesToCollapse
      );
    },
    shouldCollapseRightSide() {
      // Magic 2: prevents collapsing a single page on the right side
      const diff = this.totalPages - 2 - this.value;
      return diff > this.maxAdjacentPages && this.totalPages > this.minTotalPagesToCollapse;
    },
    visibleItems() {
      let items = [];

      if (!this.isCompactPagination) {
        let firstPage = this.shouldCollapseLeftSide ? this.value - this.maxAdjacentPages : 1;
        // If we're on last page, show at least one page to the left
        firstPage = Math.min(firstPage, this.totalPages - 1);
        let lastPage = this.shouldCollapseRightSide
          ? this.value + this.maxAdjacentPages
          : this.totalPages;
        // If we're on first page, show at least one page to the right
        lastPage = Math.max(lastPage, 2);

        // Default numbered items
        items = pageRange(firstPage, lastPage, 1).map((page) => this.getPageItem(page));

        if (this.shouldCollapseLeftSide) {
          items.splice(
            0,
            0,
            this.getPageItem(1, this.labelFirstPage),
            this.getEllipsisItem('left')
          );
        }

        if (this.shouldCollapseRightSide) {
          items.push(
            this.getEllipsisItem('right'),
            this.getPageItem(this.totalPages, this.labelLastPage)
          );
        }
      }

      return items;
    },
    isCompactPagination() {
      return Boolean(!this.totalItems && (this.prevPage || this.nextPage));
    },
    prevPageIsDisabled() {
      return this.pageIsDisabled(this.value - 1);
    },
    nextPageIsDisabled() {
      return this.pageIsDisabled(this.value + 1);
    },
  },
  created() {
    window.addEventListener('resize', debounce(this.setBreakpoint, resizeDebounceTime));
  },
  beforeDestroy() {
    window.removeEventListener('resize', debounce(this.setBreakpoint, resizeDebounceTime));
  },
  methods: {
    setBreakpoint() {
      this.breakpoint = Breakpoints.getBreakpointSize();
    },
    pageIsDisabled(page) {
      return (
        this.disabled ||
        page < 1 ||
        (this.isCompactPagination && page > this.value && !this.nextPage) ||
        (!this.isCompactPagination && page > this.totalPages)
      );
    },
    getPageItem(page, label = null) {
      const commonAttrs = {
        'aria-label': label || this.labelPage(page),
        href: '#',
        class: [],
      };
      const isActivePage = page === this.value;
      const isDisabled = this.pageIsDisabled(page);

      const attrs = { ...commonAttrs };
      const listeners = {};
      if (isActivePage) {
        attrs.class.push('active');
      }
      // Disable previous and/or next buttons if needed
      if (this.isLinkBased) {
        attrs.href = this.linkGen(page);
      }
      listeners.click = (e) => this.handleClick(e, page);
      return {
        content: page,
        component: isDisabled ? 'span' : GlLink,
        disabled: isDisabled,
        key: `page_${page}`,
        slot: 'page-number',
        slotData: {
          page,
          active: isActivePage,
          disabled: isDisabled,
        },
        attrs,
        listeners,
      };
    },
    getEllipsisItem(side) {
      return {
        content: this.ellipsisText,
        key: `ellipsis_${side}`,
        slot: `ellipsis-${side}`,
        component: 'span',
        disabled: true,
      };
    },
    handleClick(event, value) {
      if (!this.isLinkBased) {
        event.preventDefault();
        this.$emit('input', value);
      }
    },
    handlePrevious(event, value) {
      this.handleClick(event, value);
      this.$emit('previous');
    },
    handleNext(event, value) {
      this.handleClick(event, value);
      this.$emit('next');
    },
  },
};
</script>

<template>
  <ul
    v-if="isVisible"
    role="navigation"
    class="pagination gl-pagination text-nowrap"
    :class="wrapperClasses"
    aria-label="Pagination"
  >
    <li
      class="page-item"
      :class="{
        disabled: prevPageIsDisabled,
        'flex-fill': isFillAlign,
      }"
    >
      <component
        :is="prevPageIsDisabled ? 'span' : 'a'"
        class="gl-link page-link prev-page-item gl-display-flex"
        :aria-disabled="prevPageIsDisabled"
        :aria-label="labelPrevPage || labelPage(value - 1)"
        :href="isLinkBased ? linkGen(value - 1) : '#'"
        @click="handlePrevious($event, value - 1)"
      >
        <slot name="previous" v-bind="{ page: value - 1, disabled: prevPageIsDisabled }">
          <gl-icon name="chevron-left" />
          <span>{{ prevText }}</span>
        </slot>
      </component>
    </li>
    <li
      v-for="item in visibleItems"
      :key="item.key"
      class="page-item"
      :class="{
        disabled: item.disabled,
        'flex-fill': isFillAlign,
      }"
    >
      <component
        :is="item.component"
        size="md"
        :aria-disabled="item.disabled"
        class="page-link"
        v-bind="item.attrs"
        v-on="item.listeners"
      >
        <slot :name="item.slot" v-bind="item.slotData">{{ item.content }}</slot>
      </component>
    </li>

    <li
      class="page-item"
      :class="{
        disabled: nextPageIsDisabled,
        'flex-fill': isFillAlign,
      }"
    >
      <component
        :is="nextPageIsDisabled ? 'span' : 'a'"
        class="gl-link page-link next-page-item gl-display-flex"
        :aria-disabled="nextPageIsDisabled"
        :aria-label="labelNextPage || labelPage(value + 1)"
        :href="isLinkBased ? linkGen(value + 1) : '#'"
        @click="handleNext($event, value + 1)"
      >
        <slot name="next" v-bind="{ page: value + 1, disabled: nextPageIsDisabled }">
          <span>{{ nextText }}</span>
          <gl-icon name="chevron-right" />
        </slot>
      </component>
    </li>
  </ul>
</template>
