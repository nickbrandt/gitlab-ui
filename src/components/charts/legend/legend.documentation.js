import description from './legend.md';
import examples from './examples';

export default {
  description,
  examples,
  propsInfo: {
    averageText: {
      additionalInfo:
        'Text for data average (overridden by prop if needed for internationalization)',
    },
    maxText: {
      additionalInfo: 'Text for max amount (overridden by prop if needed for internationalization)',
    },
    layout: {
      additionalInfo: 'Sets the display layout',
    },
  },
};
