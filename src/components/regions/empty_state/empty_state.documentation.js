import description from './empty_state.md';
import examples from './examples';

export default {
  description,
  examples,
  propsInfo: {
    svgPath: {
      additionalInfo: "The illustration's URL.",
    },
    compact: {
      additionalInfo: 'Set to true to enable the compact layout.',
    },
  },
  slots: [
    {
      name: 'description',
      description:
        "Use this slot to customize the empty state's description area. Overrides the `description` prop.",
    },
    {
      name: 'actions',
      description:
        "Use this slot to customize the empty state's actions area, where the buttons are. Overrides button-related props: `primaryButtonLink`, `primaryButtonText`, `secondaryButtonLink`, `secondaryButtonText`.",
    },
  ],
};
