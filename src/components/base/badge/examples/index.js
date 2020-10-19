import BadgeBasicExample from './badge.basic.example.vue';
import BadgeSizesExample from './badge.sizes.example.vue';
import BadgeVariantsExample from './badge.variants.example.vue';
import BadgeActionableExample from './badge.action.example.vue';
import BadgeButtonExample from './badge.button.example.vue';
import BadgeIconExample from './badge.icon.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'badge-basic',
        name: 'Basic',
        description: 'Basic Badge',
        component: BadgeBasicExample,
      },
      {
        id: 'badge-variants',
        name: 'Variants',
        description: 'Different Badge Variants',
        component: BadgeVariantsExample,
      },
      {
        id: 'badge-sizes',
        name: 'Sizes',
        description: 'Different Badge Sizes',
        component: BadgeSizesExample,
      },
      {
        id: 'badge-actions',
        name: 'Actionable',
        description: 'Badges with Actions',
        component: BadgeActionableExample,
      },
      {
        id: 'badge-button',
        name: 'Inside Button',
        description: 'Show Badge inside Button',
        component: BadgeButtonExample,
      },
      {
        id: 'badge-icon',
        name: 'Badge Icon',
        description: 'Show Icon inside Badge',
        component: BadgeIconExample,
      },
    ],
  },
];
