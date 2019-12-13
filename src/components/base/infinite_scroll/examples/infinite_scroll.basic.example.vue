<script>
const ITEMS_BATCH_SIZE = 20;

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
        <span v-else>{{ fetchedItems }} items loaded</span>
      </div>
    </template>
  </gl-infinite-scroll>
</template>
