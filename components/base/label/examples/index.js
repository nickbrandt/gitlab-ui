import LabelBasicExample from './label.basic.example.vue';
import LabelTargetExample from './label.target.example.vue';
import LabelScopedExample from './label.scoped.example.vue';
import LabelDescriptionExample from './label.desciption.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'label-basic',
        name: 'default',
        description: 'Basic Label',
        component: LabelBasicExample,
      },
      {
        id: 'label-tooltip',
        name: 'description',
        description: 'Labels with Description',
        component: LabelDescriptionExample,
      },
      {
        id: 'label-target',
        name: 'target',
        description: 'Label with target',
        component: LabelTargetExample,
      },
      {
        id: 'label-scoped',
        name: 'scoped',
        description: 'Scoped Label',
        component: LabelScopedExample,
      },
    ],
  },
];
