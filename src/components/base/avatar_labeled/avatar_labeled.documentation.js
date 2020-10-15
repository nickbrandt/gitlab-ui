import description from './avatar_labeled.md';

export default {
  followsDesignSystem: true,
  description,

  slots: [
    {
      name: 'meta',
      description:
        'Meta data to add to the avatar. Generally used for badges or user status emoji.',
    },
  ],
};
