import AvatarLabeledExample from './avatar.labeled.example.vue';
import AvatarLabeledTooltipExample from './avatar.labeled_tooltip.example.vue';
import AvatarLabeledBadgesExample from './avatar.labeled_badges.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'avatar-labeled',
        name: 'Avatar Labeled',
        description: 'Avatar with text labels',
        component: AvatarLabeledExample,
      },
      {
        id: 'avatar-labeled-tooltip',
        name: 'With tooltip',
        description: 'Avatar labeled with tooltip',
        component: AvatarLabeledTooltipExample,
      },
      {
        id: 'avatar-labeled-badges',
        name: 'With badges',
        description: 'Avatar labeled with badges',
        component: AvatarLabeledBadgesExample,
      },
    ],
  },
];
