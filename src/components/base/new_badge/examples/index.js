import NewBadgeBasicExample from './new_badge.basic.example.vue';
import NewBadgeVariantExample from './new_badge.variant.example.vue';
import NewBadgeSizeExample from './new_badge.size.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'new-badge-basic-example',
        name: 'Basic',
        description: 'Basic Badge',
        component: NewBadgeBasicExample,
      },
      {
        id: 'new-badge-variants-example',
        name: 'Variants',
        description: 'Badge variants',
        component: NewBadgeVariantExample,
      },
      {
        id: 'new-badge-size-example',
        name: 'Sizes',
        description: 'Badge sizes',
        component: NewBadgeSizeExample,
      },
    ],
  },
];
