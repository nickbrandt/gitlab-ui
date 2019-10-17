import LoadingIconSmallExample from './loading_icon.small.example.vue';
import LoadingIconMediumExample from './loading_icon.medium.example.vue';
import LoadingIconLargeExample from './loading_icon.large.example.vue';
import LoadingIconExtraLargeExample from './loading_icon.extra_large.example.vue';
import LoadingIconInlineExample from './loading_icon.inline.example.vue';
import LoadingIconAllOptionsExample from './loading_icon.all.example.vue';

export default [
  {
    name: 'Display',
    items: [
      {
        id: 'loading-icon-inline',
        name: 'Inline',
        description: 'Loading Icon Inline',
        component: LoadingIconInlineExample,
      },
    ],
  },
  {
    name: 'Size',
    items: [
      {
        id: 'loading-icon-small',
        name: 'Small (16x16)',
        description: 'Small Loading Icon',
        component: LoadingIconSmallExample,
      },
      {
        id: 'loading-icon-medium',
        name: 'Medium (24x24)',
        description: 'Medium Loading Icon',
        component: LoadingIconMediumExample,
      },
      {
        id: 'loading-icon-large',
        name: 'Large (32x32)',
        description: 'Large Loading Icon',
        component: LoadingIconLargeExample,
      },
      {
        id: 'loading-icon-extra-large',
        name: 'Extra Large (64x64)',
        description: 'Extra Large Loading Icon',
        component: LoadingIconExtraLargeExample,
      },
    ],
  },
  {
    name: 'Full',
    items: [
      {
        id: 'loading-icon-all-options',
        name: 'All sizes and colors',
        description: 'Loading Icon: all sizes and colors',
        component: LoadingIconAllOptionsExample,
      },
    ],
  },
];
