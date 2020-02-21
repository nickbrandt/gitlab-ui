import BasicExample from './{{name}}.basic.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: '{{kebabCase name}}-basic',
        name: 'Basic',
        description: 'Basic {{titleCase name}}',
        component: BasicExample,
      },
    ],
  },
];
