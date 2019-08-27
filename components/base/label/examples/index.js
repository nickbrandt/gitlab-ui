import LabelBasicExample from './label.basic.example.vue';
import LabelScopedExample from './label.scoped.example.vue';

export default [
  {
    name: 'Label',
    items: [
      {
        id: 'label-basic',
        name: 'default',
        description: 'Basic Label',
        component: LabelBasicExample,
      },
      {
        id: 'label-scoped',
        name: 'scoped',
        description: 'Scoped::Label',
        component: LabelScopedExample,
      },
    ],
  },
];
