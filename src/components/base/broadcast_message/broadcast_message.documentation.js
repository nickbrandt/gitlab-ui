import description from './broadcast_message.md';
import examples from './examples';

export default {
  followsDesignSystem: false,
  examples,
  description,
  propsInfo: {
    iconName: {
      additionalInfo: 'The icon to show next to the text',
    },
    dismissLabel: {
      additionalInfo:
        "The dismiss button's label, it is visible in mobile viewports and used for the button's aria-label attribute",
    },
    theme: {
      additionalInfo:
        "The theme's name to use, this should correspond to the user's selected theme in GitLab",
    },
  },
  slots: [
    {
      name: 'default',
      description: "The broadcast message's text",
    },
  ],
};
