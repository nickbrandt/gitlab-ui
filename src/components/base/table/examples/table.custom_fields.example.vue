<script>
export default {
  fields: [
    {
      key: 'column_one',
      label: 'Column One',
    },
    {
      key: 'col_2',
      label: 'Styled Column 2',
    },
    {
      key: 'custom_markup',
      label: 'Styled Virtual Column',
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
  <gl-table :items="$options.items" :fields="$options.fields">
    <template #cell(col_2)="{ value }">
      <span class="gl-font-weight-bold gl-text-green-500">{{ value }}</span>
    </template>
    <template #cell(custom_markup)="{ index }">
      <span class="gl-font-style-italic gl-text-red-500">Index: {{ index + 1 }}</span>
    </template>
  </gl-table>
</template>
