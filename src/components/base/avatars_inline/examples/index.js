import AvatarsInlineExample from './avatars.inline.example.vue';
import AvatarsInlineLargeExample from './avatars.inline_large.example.vue';
import AvatarsInlineLinksAndTooltipsExample from './avatars.inline_links_and_tooltips.example.vue';
import AvatarsInlineLinksAndTooltipsBadgeExample from './avatars.inline_links_and_tooltips_badge.example.vue';

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
        description: 'Inline Avatars with Links and Tooltips',
        component: AvatarsInlineLinksAndTooltipsExample,
      },
      {
        id: 'avatars-inline-links-and-tooltips-badge',
        name: 'Avatars inline with tooltip on badge',
        description: 'Inline Avatars with Tooltip on Badge',
        component: AvatarsInlineLinksAndTooltipsBadgeExample,
      },
    ],
  },
];
