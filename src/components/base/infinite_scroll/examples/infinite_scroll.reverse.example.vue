<script>
const ITEMS_BATCH_SIZE = 5;
const INIT_ITEMS_COUNT = 10;

export default {
  data() {
    return {
      isLoading: false,
      fetchedItems: INIT_ITEMS_COUNT,
      loadTimer: null,
    };
  },
  methods: {
    topReached() {
      clearTimeout(this.loadTimer);
      this.isLoading = true;
      this.loadTimer = setTimeout(() => {
        this.fetchedItems += ITEMS_BATCH_SIZE;
        this.isLoading = false;
      }, 2000);
    },
  },
};
</script>
<template>
  <gl-infinite-scroll :max-list-height="285" :fetched-items="fetchedItems" @topReached="topReached">
    <template #header>
      <div class="gl-h-6">
        <gl-loading-icon v-if="isLoading" />
      </div>
    </template>
    <template #items>
      <ul class="list-group list-group-flushed list-unstyled">
        <li v-for="item in fetchedItems" :key="item" class="list-group-item">
          Item #{{ Math.abs(item - fetchedItems) + 1 }}
        </li>
      </ul>
    </template>

    <template #default>
      <div class="gl-mt-3">
        <span>{{ fetchedItems }} items loaded, scroll up for more</span>
      </div>
    </template>
  </gl-infinite-scroll>
</template>
