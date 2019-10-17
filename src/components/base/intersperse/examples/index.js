import Intersperse from './intersperse.default.example.vue';
import IntersperseCustomSeparator from './intersperse.custom_separator.example.vue';
import IntersperseCustomLastSeparator from './intersperse.custom_last_separator.example.vue';
import IntersperseCustomLastSeparatorTwoItems from './intersperse.custom_last_separator_two_items.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'intersperse-default',
        name: 'Default Intersperse',
        description: 'Default intersperse usage',
        component: Intersperse,
      },
      {
        id: 'intersperse-custom-separator',
        name: 'Intersperse with custom separator',
        description: 'Set a custom separator',
        component: IntersperseCustomSeparator,
      },
      {
        id: 'intersperse-custom-last-separator',
        name: 'Intersperse with custom last separator',
        description: 'Set a custom last separator',
        component: IntersperseCustomLastSeparator,
      },
      {
        id: 'intersperse-custom-last-separator-two-items',
        name: 'Intersperse with custom last separator and two items',
        description: 'Set a custom last separator on two items',
        component: IntersperseCustomLastSeparatorTwoItems,
      },
    ],
  },
];
