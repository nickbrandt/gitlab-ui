import CardBasicExample from './card.basic.example.vue';
import CardHeaderFooter from './card.headerfooter.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'card-basic',
        name: 'Basic',
        description: 'Basic Card',
        component: CardBasicExample,
      },
      {
        id: 'card-with-header-footer',
        name: 'Card with Header and Footer',
        description: 'Card with Header and Footer',
        component: CardHeaderFooter,
      },
    ],
  },
];
