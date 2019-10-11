import TokenExample from './token.basic.example.vue';
import TokenViewOnlyExample from './token.view_only.example.vue';
import TokenWithAvatarExample from './token.with_avatar.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'token-basic',
        name: 'Basic',
        description: 'Basic Token',
        component: TokenExample,
      },
    ],
  },
  {
    name: 'View Only',
    items: [
      {
        id: 'token-view-only',
        name: 'View Only',
        description: 'View Only Token',
        component: TokenViewOnlyExample,
      },
    ],
  },
  {
    name: 'With Avatar',
    items: [
      {
        id: 'token-with-avatar',
        name: 'With Avatar',
        description: 'Token With Avatar',
        component: TokenWithAvatarExample,
      },
    ],
  },
];
