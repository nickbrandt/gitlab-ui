import LoadingIconBasicExample from './loading_icon.basic.example.vue';
import LoadingIconBigExample from './loading_icon.big.example.vue';
import LoadingIconInlineExample from './loading_icon.inline.example.vue';

export default [
  {
    name: 'Basic',
    examples: [
      {
        id: 'loading_icon-basic',
        name: 'Basic',
        description: 'Basic Loading Icon',
        component: LoadingIconBasicExample,
      },
      {
        id: 'loading_icon-big',
        name: 'Big',
        description: 'Big Loading Icon',
        component: LoadingIconBigExample,
      },
      {
        id: 'loading_icon-inline',
        name: 'Inline',
        description: 'Loading Icon Inline',
        component: LoadingIconInlineExample,
      },
    ],
  },
];
