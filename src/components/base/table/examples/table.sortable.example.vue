<script>
export default {
  fields: [
    {
      key: 'column_one',
      label: 'Column One',
      sortable: true,
    },
    {
      key: 'column_two',
      label: 'Column Two',
      sortable: true,
    },
  ],
  items: [
    {
      column_one: 'test',
      column_two: 6667,
    },
    {
      column_one: 'test2',
      column_two: 9222,
    },
    {
      column_one: 'test3',
      column_two: 420,
    },
  ],
  data() {
    return {
      items: this.$options.items,
    };
  },
  methods: {
    fetchSortedData({ columnKey, direction }) {
      const sortBy = key => {
        return (a, b) => {
          if (a[key] > b[key]) {
            return 1;
          }
          return b[key] > a[key] ? -1 : 0;
        };
      };
      return direction === 'ASC'
        ? this.items.sort(sortBy(columnKey))
        : this.items.sort(sortBy(columnKey)).reverse();
    },
  },
};
</script>

<template>
  <gl-table :items="items" :fields="$options.fields" @fetch-sorted-data="fetchSortedData" />
</template>
