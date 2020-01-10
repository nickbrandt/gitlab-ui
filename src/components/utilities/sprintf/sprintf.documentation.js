import description from './sprintf.md';
import examples from './examples';

export default {
  followsDesignSystem: false,
  description,
  examples,
  slots: [
    {
      name: '* (arbitrary)',
      description:
        'Available slots are determined by the interpolations in the provided message prop. For example, a message of "Written by %{author}" has a slot called "author", and its content is used to replace "%{author}" in the rendered output.',
    },
  ],
};
