import LabelBasicExample from './label.basic.example.vue';
import LabelScopedExample from './label.scoped.example.vue';
import LabelWithLinkExample from './label.with_link.example.vue';

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
        id: 'label-with-link',
        name: 'with link',
        description: 'Label with link in description',
        component: LabelWithLinkExample,
      },
    ],
  },
];
