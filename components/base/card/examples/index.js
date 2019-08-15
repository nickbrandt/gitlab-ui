import CardBasicExample from './card.example.vue';
import CardAlternateText from './card.alternate.text.tag.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'card-alternate-text-tag',
        name: 'Alternate text tag',
        component: CardAlternateText,
      },
      {
        id: 'card-basic',
        name: 'Basic',
        component: CardBasicExample,
      },
    ],
  },
];
