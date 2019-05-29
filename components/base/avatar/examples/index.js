import AvatarImageExample from './avatar.image.example.vue';
import AvatarRectExample from './avatar.rect.example.vue';
import AvatarProjectFallbackExample from './avatar.fallback.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'avatar-image',
        name: 'Default Image',
        description: 'Avatar with an image',
        component: AvatarImageExample,
      },
      {
        id: 'avatar-image-rect',
        name: 'Rectangular Image',
        description: 'Avatar with a rectangular image',
        component: AvatarRectExample,
      },
      {
        id: 'avatar-project-fallback',
        name: 'Project/Group Fallback',
        description: 'A fallback for projects or groups without an image',
        component: AvatarProjectFallbackExample,
      },
    ],
  },
];
