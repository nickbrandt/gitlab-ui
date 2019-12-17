import AvatarsInlineExample from './avatars.inline.example.vue';
import AvatarsInlineLargeExample from './avatars.inline_large.example.vue';
import AvatarsInlineLinksAndTooltipsExample from './avatars.inline_links_and_tooltips.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'avatars-inline',
        name: 'Avatars Inline',
        description: 'Inline Avatars',
        component: AvatarsInlineExample,
      },
      {
        id: 'avatars-inline-large',
        name: 'Avatars Inline Large',
        description: 'Inline Avatars Large',
        component: AvatarsInlineLargeExample,
      },
      {
        id: 'avatars-inline-links-and-tooltips',
        name: 'Avatars inline with links and tooltips',
        description: 'Inline Avatars Large',
        component: AvatarsInlineLinksAndTooltipsExample,
      },
    ],
  },
];
