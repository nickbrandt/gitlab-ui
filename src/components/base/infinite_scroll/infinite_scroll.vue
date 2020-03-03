<script>
import throttle from 'lodash/throttle';

const throttleDuration = 1000;
/**
 * After adding more items, scroll will adjust slightly.
 * Values in pixels, should be a small amount.
 */
export const adjustScrollGap = 5;

export default {
  props: {
    totalItems: {
      type: Number,
      required: false,
      default: 0,
    },
    fetchedItems: {
      type: Number,
      required: true,
    },
    maxListHeight: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  computed: {
    listHeight() {
      return {
        maxHeight: this.maxListHeight ? `${this.maxListHeight}px` : 'auto',
      };
    },
  },
  watch: {
    fetchedItems(newVal, oldVal) {
      // Re-adjust scroll to the current item if more items are added
      if (newVal > oldVal) {
        const { scrollHeight, scrollTop } = this.$refs.infiniteContainer;
        // Only when scrolled to the top
        if (scrollHeight !== 0 && scrollTop === 0) {
          // Store scrollHeight to know how far to scroll
          this.$options.adjustScrollHeight = scrollHeight;
        }
      }
    },
  },

  mounted() {
    // Scroll to bottom for reverse effect
    this.$nextTick(() => {
      if (this.$listeners.topReached && !this.$listeners.bottomReached) {
        this.scrollDown();
      }
    });
  },

  updated() {
    // Wait until the DOM is fully updated to adjust scroll
    this.$nextTick(() => {
      if (this.$options.adjustScrollHeight) {
        const { scrollHeight } = this.$refs.infiniteContainer;

        // New scrollTop is the new height, minus the old height
        // minus a small space to allow the user to trigger a scroll once more
        let top = scrollHeight - this.$options.adjustScrollHeight - adjustScrollGap;

        // Never adjust to 0, or a new event may be be triggered
        if (top < 1) {
          top = 1;
        }

        this.scrollTo({ top });
        // Prevent subsequent updates
        this.$options.adjustScrollHeight = null;
      }
    });
  },

  methods: {
    /**
     * Scroll to the top of the container, leaving a gap
     * to avoid triggering the event.
     */
    scrollUp() {
      this.scrollTo({ top: adjustScrollGap });
    },
    /**
     * Scroll to the bottom of the container, leaving a gap
     * to avoid triggering the event.
     */
    scrollDown() {
      const { scrollHeight } = this.$refs.infiniteContainer;
      this.scrollTo({ top: scrollHeight - adjustScrollGap });
    },
    /**
     * Scroll to a location in the container
     *
     * @param params.top - Number of pixels along Y axis to
     * scroll the list container.
     */
    scrollTo({ top }) {
      this.$refs.infiniteContainer.scrollTo({ top });
    },

    topReached: throttle(function topReachedThrottled() {
      this.$emit('topReached');
    }, throttleDuration),
    bottomReached: throttle(function bottomReachedThrottled() {
      this.$emit('bottomReached');
    }, throttleDuration),
    itemsListHeight() {
      return this.$refs.infiniteContainer.scrollHeight;
    },
    scrollTop() {
      return this.$refs.infiniteContainer.scrollTop;
    },
    handleScroll: throttle(function handleScrollThrottled() {
      if (this.scrollTop() + this.maxListHeight >= this.itemsListHeight()) {
        this.bottomReached();
      } else if (this.scrollTop() === 0) {
        this.topReached();
      }
    }),
  },
};
</script>

<template>
  <div>
    <slot name="header"></slot>
    <div
      ref="infiniteContainer"
      :style="listHeight"
      class="gl-infinite-scroll-container"
      @scroll="handleScroll"
    >
      <slot name="items"></slot>
    </div>
    <p class="gl-infinite-scroll-legend">
      <slot :fetched-items="fetchedItems" :total-items="totalItems">
        Showing {{ fetchedItems }} of {{ totalItems }} items
      </slot>
    </p>
  </div>
</template>
