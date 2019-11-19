<script>
export default {
  data() {
    return {
      isLoading: false,
      fetchedItems: 10,
      loadTimer: null,
    };
  },
  methods: {
    bottomReached() {
      clearTimeout(this.loadTimer);
      this.isLoading = true;
      this.loadTimer = setTimeout(() => {
        this.fetchedItems += 10;
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
