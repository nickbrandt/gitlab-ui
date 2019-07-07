import LabelBasicExample from './label.basic.example.vue';
import LabelScopedExample from './label.scoped.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'label-basic',
        name: 'default',
        title: 'Basic Label',
        description: 'Basic Label',
        component: LabelBasicExample,
      },
      {
        id: 'label-scoped',
        name: 'scoped',
        title: 'Scoped::Label',
        description: 'Basic Label',
        component: LabelScopedExample,
      },
    ],
  },
];
