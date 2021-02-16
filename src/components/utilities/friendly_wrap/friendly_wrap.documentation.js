import examples from './examples';
import description from './friendly_wrap.md';

export default {
  description,
  examples,
  propsInfo: {
    text: {
      additionalInfo: 'Text to be wrapped',
    },
    symbols: {
      additionalInfo: 'A list of strings representing the break-words',
    },
  },
};
