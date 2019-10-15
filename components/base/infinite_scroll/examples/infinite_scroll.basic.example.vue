<script>
export default {
  data() {
    const items = [
      { name: 'One' },
      { name: 'Two' },
      { name: 'Tres' },
      { name: 'Quattro' },
      { name: 'Funf' },
      { name: 'Seis' },
      { name: 'Seven' },
      { name: 'Huit' },
      { name: 'Neun' },
      { name: 'Ten' },
      { name: 'Elf' },
    ];
    return {
      items,
      fetchedItems: 6,
    };
  },
  computed: {
    visibleItems() {
      return this.items.slice(0, this.fetchedItems);
    },
  },
  methods: {
    bottomReached() {
      this.fetchedItems = this.items.length;
    },
  },
};
</script>
<template>
  <gl-infinite-scroll
    :max-list-height="285"
    :total-items="items.length"
    :fetched-items="fetchedItems"
    @bottomReached="bottomReached"
  >
    <ul slot="items" class="list-group list-group-flushed list-unstyled">
      <li v-for="item in visibleItems" :key="item.name" class="list-group-item">
        {{ item.name }}
      </li>
    </ul>
  </gl-infinite-scroll>
</template>
