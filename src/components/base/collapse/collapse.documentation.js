import description from './collapse.md';

export default {
  description,

  bootstrapPropsInfo: {
    id: {
      additionalInfo:
        "Used to set the 'id' attribute on the rendered content, and used as the base to generate any additional element IDs as needed",
    },
    isNav: {
      additionalInfo:
        'When set, signifies that the collapse is part of a navbar, enabling certain features for navbar support',
    },
    accordion: {
      additionalInfo: 'The name of the accordion group that this collapse belongs to',
    },
    visible: {
      additionalInfo: "When 'true', expands the collapse",
    },
    tag: {
      additionalInfo: 'Specify the HTML tag to render instead of the default tag',
    },
  },
  events: [
    {
      event: 'input',
      description: 'Emitted when the visibility changes',
      args: [
        {
          arg: 'visible',
          description: 'The visibility state',
        },
      ],
    },
  ],
  slots: [
    {
      name: 'default',
      description: 'Body of Collapse that should be visible/hidden on state change.',
    },
  ],
  bootstrapComponent: 'b-collapse',
};
