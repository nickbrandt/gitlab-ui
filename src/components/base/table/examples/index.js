import component from './table.basic.example.vue';
import componentBorderless from './table.borderless.example.vue';
import componentCustomFields from './table.custom_fields.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'table-basic',
        name: 'Basic',
        description: 'Basic Table',
        component,
      },
      {
        id: 'table-custom-fields',
        name: 'Custom Fields',
        description: 'Custom component fields',
        component: componentCustomFields,
      },
      {
        id: 'table-borderless',
        name: 'Borderless',
        description: 'Table without horizontal borders between rows',
        component: componentBorderless,
      },
    ],
  },
];
