import AreaBasicExample from './area.basic.example.vue';
import AreaBasicPlusExample from './area.basic_plus.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'area-basic',
        name: 'Basic',
        description: 'Basic Area Chart',
        component: AreaBasicExample,
      },
      {
        id: 'area-basic-plus',
        name: 'Basic plus custom series',
        description: 'Basic area chart with custom series added',
        component: AreaBasicPlusExample,
      },
    ],
  },
];
