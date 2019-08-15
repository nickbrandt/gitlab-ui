import CardBasicExample from './card.example.vue';
import CardAlternateText from './card.alternate.text.tag.example.vue';
import CardPurchasePlans from './card.purchase.plans.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'card-basic',
        name: 'Basic',
        component: CardBasicExample,
      },
      {
        id: 'card-alternate-text-tag',
        name: 'Alternate text tag',
        component: CardAlternateText,
      },
      {
        id: 'card-purchase-plans',
        name: 'Purchase plans',
        description: 'As used in group billing page',
        component: CardPurchasePlans,
      },
    ],
  },
];
