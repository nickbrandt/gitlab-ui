import description from './truncate.md';

export default {
  description,

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
