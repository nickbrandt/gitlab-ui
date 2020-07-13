import description from './truncate.md';
import examples from './examples';

export default {
  description,
  examples,
  propsInfo: {
    text: {
      additionalInfo: 'Text to be ellipsized',
    },
    position: {
      additionalInfo: 'Ellipsis position',
      enum: 'truncateOptions',
    },
  },
};
