<script>
const ITEMS_BATCH_SIZE = 60;
const TOTAL_ITEMS = 100;

export default {
  data() {
    return {
      totalItems: TOTAL_ITEMS,
      isLoading: false,
      fetchedItems: ITEMS_BATCH_SIZE,
      loadTimer: null,
    };
  },
  methods: {
    bottomReached() {
      clearTimeout(this.loadTimer);
      if (this.fetchedItems < TOTAL_ITEMS) {
        this.isLoading = true;
        this.loadTimer = setTimeout(() => {
          this.fetchedItems += ITEMS_BATCH_SIZE;
          if (this.fetchedItems > TOTAL_ITEMS) {
            this.fetchedItems = TOTAL_ITEMS;
          }
          this.isLoading = false;
        }, 500);
      }
    },
  },
};
</script>
<template>
  <gl-infinite-scroll
    :max-list-height="285"
    :fetched-items="fetchedItems"
    :total-items="totalItems"
    @bottomReached="bottomReached"
  >
    <template #items>
      <ul class="list-group list-group-flushed list-unstyled">
        <li v-for="item in fetchedItems" :key="item" class="list-group-item">Item #{{ item }}</li>
      </ul>
    </template>
  </gl-infinite-scroll>
</template>
