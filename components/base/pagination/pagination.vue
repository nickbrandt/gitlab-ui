<script>
import range from 'lodash/range';
import isFunction from 'lodash/isFunction';
import debounce from 'lodash/debounce';
import GlLink from '../link/link.vue';
import Breakpoints, { breakpoints } from '../../../utils/breakpoints';
import { isIntGreaterThan } from '../../../utils/number_utils';
import { sizeOptions, alignOptions, resizeDebounceTime } from '../../../utils/constants';

const isIntGreaterThanZero = isIntGreaterThan(0);
const pageRange = (from, to) => range(from, to + 1, 1);

export default {
  name: 'Pagination',
  components: {
    GlLink,
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
      validator: isIntGreaterThanZero,
    },
    perPage: {
      type: Number,
      required: false,
      default: 20,
      validator: isIntGreaterThanZero,
    },
    totalItems: {
      type: Number,
      required: true,
      validator: isIntGreaterThanZero,
    },
    limits: {
      type: Object,
      require: false,
      default: () => ({
        xs: 0,
        sm: 3,
        md: 9,
        default: 9,
      }),
      validator: value => {
        const missingSizes = Object.keys(breakpoints).filter(size => !value[size]).length;
        return missingSizes === 0 ? true : value.default;
      },
    },
    linkGen: {
      type: Function,
      required: false,
      default: null,
    },
    prevText: {
      type: String,
      required: false,
      default: '‹ Prev',
    },
    nextText: {
      type: String,
      required: false,
      default: 'Next ›',
    },
    ellipsisText: {
      type: String,
      required: false,
      default: '…',
    },
    labelFirstPage: {
      type: String,
      default: 'Go to first page',
    },
    labelPrevPage: {
      type: String,
      default: 'Go to previous page',
    },
    labelNextPage: {
      type: String,
      default: 'Go to next page',
    },
    labelLastPage: {
      type: String,
      default: 'Go to last page',
    },
    labelPage: {
      type: Function,
      default: page => `Go to page ${page}`,
    },
    size: {
      type: String,
      required: false,
      default: null,
      validator: value => Object.keys(sizeOptions).includes(value),
    },
    align: {
      type: String,
      required: false,
      default: alignOptions.left,
      validator: value => Object.keys(alignOptions).includes(value),
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
      if (this.size) {
        classes.push(`pagination-${this.size}`);
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
      let firstPage = this.shouldCollapseLeftSide ? this.value - this.maxAdjacentPages : 1;
      // If we're on last page, show at least one page to the left
      firstPage = Math.min(firstPage, this.totalPages - 1);
      let lastPage = this.shouldCollapseRightSide
        ? this.value + this.maxAdjacentPages
        : this.totalPages;
      // If we're on first page, show at least one page to the right
      lastPage = Math.max(lastPage, 2);

      // Default numbered items
      const items = pageRange(firstPage, lastPage, 1).map(page => this.getPageItem(page));

      if (this.shouldCollapseLeftSide) {
        items.splice(0, 0, this.getPageItem(1, this.labelFirstPage), this.getEllipsisItem('left'));
      }

      if (this.shouldCollapseRightSide) {
        items.push(
          this.getEllipsisItem('right'),
          this.getPageItem(this.totalPages, this.labelLastPage)
        );
      }

      const prevPageItem = {
        ...this.getPageItem(this.value - 1, this.labelPrevPage),
        content: this.prevText,
        key: 'previous',
        slot: 'previous',
      };

      const nextPageItem = {
        ...this.getPageItem(this.value + 1, this.labelNextPage),
        content: this.nextText,
        key: 'next',
        slot: 'next',
      };

      return [prevPageItem, ...items, nextPageItem];
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
    getPageItem(page, label = null) {
      const commonAttrs = {
        'aria-label': label || this.labelPage(page),
        href: '#',
        class: '',
      };
      const isActivePage = page === this.value;
      const isDisabled = page < 1 || page > this.totalPages;
      const attrs = { ...commonAttrs };
      const listeners = {};
      if (isActivePage) {
        attrs.class += ' active btn-primary';
      }
      // Disable previous and/or next buttons if needed
      if (this.isLinkBased) {
        attrs.href = this.linkGen(page);
      } else {
        listeners.click = e => {
          e.preventDefault();
          this.$emit('input', page);
        };
      }
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
  },
};
</script>

<template>
  <ul
    v-if="totalPages > 1"
    role="navigation"
    class="pagination gl-pagination"
    :class="wrapperClasses"
    aria-label="Pagination"
  >
    <li
      v-for="item in visibleItems"
      :key="item.key"
      class="page-item"
      :class="{
        disabled: item.disabled || disabled,
        'flex-fill': isFillAlign,
      }"
    >
      <component
        :is="item.component"
        :size="size"
        :aria-disabled="item.disabled || disabled"
        class="page-link"
        v-bind="item.attrs"
        v-on="item.listeners"
      >
        <slot :name="item.slot" v-bind="item.slotData">{{ item.content }}</slot>
      </component>
    </li>
  </ul>
</template>
