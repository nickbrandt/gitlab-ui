## Usage

The `gl-table` component wraps BootstrapVue `b-table` component. `b-table` provides a variety of
slots for custom data rendering. You can learn more about them in the
[component documentation](https://bootstrap-vue.org/docs/components/table).
When using the component, pass in the `fields` prop as part of the `$options`, and give each table
data and table head its own styles if necessary.

## Internationalization

To ensure we internationalize field labels, always pass an array of objects for the `fields` prop,
like mentioned in the implementation example.

_Full documentation for the
`field` prop [here.](https://bootstrap-vue.org/docs/components/table#fields-column-definitions)_

## Implementation Example

```html
<script>
export default {
  fields: [
    {
      key: 'column_one',
      label: __('Column One'),
      thClass: 'w-60p',
      tdClass: 'table-col d-flex'
    },
    {
      key: 'col_2',
      label: __('Column 2'),
      thClass: 'w-15p',
      tdClass: 'table-col d-flex'
    },
  ];
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
