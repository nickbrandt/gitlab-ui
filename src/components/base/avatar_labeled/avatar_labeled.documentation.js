import description from './avatar_labeled.md';
import examples from './examples';

export default {
  followsDesignSystem: true,
  description,
  examples,
  slots: [
    {
      name: 'meta',
      description:
        'Meta data to add to the avatar. Generally used for badges or user status emoji.',
    },
  ],
};
