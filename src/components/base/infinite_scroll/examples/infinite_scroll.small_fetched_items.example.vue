<script>
const ITEMS_BATCH_SIZE = 60;

export default {
  data() {
    return {
      isLoading: false,
      fetchedItems: ITEMS_BATCH_SIZE,
      loadTimer: null,
    };
  },
  methods: {
    bottomReached() {
      clearTimeout(this.loadTimer);
      this.isLoading = true;
      this.loadTimer = setTimeout(() => {
        this.fetchedItems += ITEMS_BATCH_SIZE;
        this.isLoading = false;
      }, 500);
    },
  },
};
</script>
<template>
  <gl-infinite-scroll
    :max-list-height="285"
    :fetched-items="fetchedItems"
    @bottomReached="bottomReached"
  >
    <template #items>
      <ul class="list-group list-group-flushed list-unstyled">
        <li v-for="item in fetchedItems" :key="item" class="list-group-item">Item #{{ item }}</li>
      </ul>
    </template>

    <template #default>
      <div class="gl-mt-3">
        <gl-loading-icon v-if="isLoading" />
        <span v-else>Showing {{ fetchedItems }} of 1000+ items</span>
      </div>
    </template>
  </gl-infinite-scroll>
</template>
