import LabelBasicExample from './label.basic.example.vue';
import LabelScopedExample from './label.scoped.example.vue';
import LabelWithPopoverExample from './label.with_popover.example.vue';

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
      {
        id: 'label-with-popover',
        name: 'with popover',
        description: 'Label with popover',
        component: LabelWithPopoverExample,
      },
    ],
  },
];
