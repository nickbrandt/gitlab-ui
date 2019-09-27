import BasicExample from './treemap.basic.example.vue';
import FlatExample from './treemap.flat.example.vue';

export default [
  {
    name: 'Treemaps',
    items: [
      {
        id: 'treemap-basic',
        name: 'Basic example',
        description: 'BasicExample',
        component: BasicExample,
      },
      {
        id: 'treemap-flat',
        name: 'Flat example',
        description: 'FlatExample',
        component: FlatExample,
      },
    ],
  },
];
