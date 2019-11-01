import description from './legend.md';
import examples from './examples';

export default {
  description,
  examples,
  propsInfo: {
    averageText: {
      additionalInfo:
        'Text for data average (overriden by prop if needed for internationalization)',
    },
    maxText: {
      additionalInfo: 'Text for max amount (overriden by prop if needed for internationalization)',
    },
  },
};
