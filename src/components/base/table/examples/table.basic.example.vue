<script>
export default {
  data() {
    return {
      sortBy: 'col_2',
      sortDesc: false,
    };
  },
  fields: [
    {
      key: 'column_one',
      label: 'Column One',
      sortable: true,
    },
    {
      key: 'col_2',
      label: 'Column 2',
      sortable: true,
    },
  ],
  items: [
    {
      column_one: 'test',
      col_2: 1234,
    },
    {
      column_one: 'test2',
      col_2: 5678,
    },
    {
      column_one: 'test3',
      col_2: 9101,
    },
  ],
};
</script>

<template>
  <div>
    <gl-table
      :items="$options.items"
      :fields="$options.fields"
      :sort-by.sync="sortBy"
      :sord-desc.sync="sortDesc"
    />
    <div>
      Sorting By: <b>{{ sortBy }}</b
      >, Sort Direction:
      <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
    </div>
  </div>
</template>
