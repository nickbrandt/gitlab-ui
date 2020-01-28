import CollapseBasicExample from './collapse.basic.example.vue';
import CollapseHeaderExample from './collapse.header.example.vue';
import CollapseVModelExample from './collapse.v_model.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'collapse-basic',
        name: 'Basic',
        description: 'Basic Collapse',
        component: CollapseBasicExample,
      },
      {
        id: 'collapse-header',
        name: 'Header',
        description: 'Header Collapse',
        component: CollapseHeaderExample,
      },
      {
        id: 'collapse-vmodel',
        name: 'VModel',
        description: "Bind to the component's `v-model` to control the collapse",
        component: CollapseVModelExample,
      },
    ],
  },
];
