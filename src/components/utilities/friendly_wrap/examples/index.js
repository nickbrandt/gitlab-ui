import FriendlyWrapBasicExample from './friendly_wrap.basic.example.vue';
import FriendlyWrapWordsExample from './friendly_wrap.words.example.vue';
import FriendlyWrapMultipleSymbolsExample from './friendly_wrap.multiple_symbols.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'friendly-wrap-basic',
        name: 'Basic (break on slashes)',
        description: 'Basic wrap',
        component: FriendlyWrapBasicExample,
      },
      {
        id: 'friendly-wrap-words',
        name: 'Word as break symbol ("dolor")',
        description: 'Wrap text using break words',
        component: FriendlyWrapWordsExample,
      },
      {
        id: 'friendly-wrap-multiple-symbols',
        name: 'Multiple break symbols ("a" and "o")',
        description: 'Define multiple break symbols',
        component: FriendlyWrapMultipleSymbolsExample,
      },
    ],
  },
];
