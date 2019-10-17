<script>
import throttle from 'lodash/throttle';
import { throttleDuration } from '../../../utils/constants';

export default {
  props: {
    totalItems: {
      type: Number,
      required: true,
      default: 0,
    },
    fetchedItems: {
      type: Number,
      required: true,
      default: 0,
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
  methods: {
    bottomReached: throttle(function throttleScroll() {
      this.$emit('bottomReached');
    }, throttleDuration),
    itemsListHeight() {
      return this.$refs.infiniteContainer.scrollHeight;
    },
    scrollFromTop() {
      return this.$refs.infiniteContainer.scrollTop + this.maxListHeight;
    },
    handleScroll() {
      if (this.scrollFromTop() >= this.itemsListHeight()) {
        this.bottomReached();
      }
    },
  },
};
</script>

<template>
  <div>
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
