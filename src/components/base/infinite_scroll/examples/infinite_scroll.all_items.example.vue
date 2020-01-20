<script>
const FETCHED_ITEMS = 5;

export default {
  data() {
    return {
      fetchedItems: FETCHED_ITEMS,
    };
  },
};
</script>
<template>
  <gl-infinite-scroll :fetched-items="fetchedItems">
    <template #items>
      <ul class="list-group list-group-flushed list-unstyled">
        <li v-for="item in fetchedItems" :key="item" class="list-group-item">Item #{{ item }}</li>
      </ul>
    </template>
    <template #default>
      <div class="gl-mt-3">
        <span>All items loaded</span>
      </div>
    </template>
  </gl-infinite-scroll>
</template>
