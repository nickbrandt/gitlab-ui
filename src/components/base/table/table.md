### Usage

The `gl-table` component wraps BootstrapVue `b-table` component. `b-table` provides a variety of slots for custom data rendering. You can learn more about them in the [component documentation](https://bootstrap-vue.js.org/docs/components/table). When using the component, pass in the `fields` prop as part of the `$options`,
and give each table data and table head its own styles if necessary.

If you'd like the table to have sorting capabilities, you will need to set up two
things: 

1. Add `sortable: true` to the fields that need to be sorted
```
  fields: [
    {
      key: 'column_one',
      sortable: true
      ...
```
2. Add the `fetchSortedData` function which will request the sorted data to the
   backend
```
    fetchSortedData({ columnKey, direction }) {
      <!-- The component will emit the func and the `columnKey` and
      `direction` arguments so it can be easily passed to the backend
      -->
    },
```

_For more details, please consult the extensive documentation for
[table sorting](https://bootstrap-vue.org/docs/components/table#sorting)_

**Internationalization**

To ensure we internationalize field labels, always pass an array of objects for the `fields` prop, like mentioned in the implementation example.

_Full documentation for the
`field` prop [here.](https://bootstrap-vue.js.org/docs/components/table/#fields-columns-definitions)_

### Full Implementation Example, with sorting enabled

```js
<script>
export default {
  fields: [
    {
      key: 'column_one',
      label: __('Column One'),
      thClass: 'w-60p',
      tdClass: 'table-col d-flex',
      sortable: true
    },
    {
      key: 'col_2',
      label: __('Column 2'),
      thClass: 'w-15p',
      tdClass: 'table-col d-flex',
      sortable: true
    },
  ];
  methods: {
    fetchSortedData({ columnKey, direction }) {
      <!-- The component will emit the func and the `columnKey` and
      `direction` arguments so it can be easily passed to the backend
      -->
    },
  },
}
</script>
<template>
  <gl-table
    :items="items"
    :fields="$options.fields"
  >
    <template #head(column_one)>
      <div>Column One</div><!-- This is the column head for the first object in `fields` -->
    </template>

    <template #cell(column_one)>
      This is the template for column data belonging to the first object
    </template>

  </gl-table>
</template>
```
