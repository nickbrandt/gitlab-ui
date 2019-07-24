import * as description from './loading_icon.md';
import examples from './examples';

export default {
  followsDesignSystem: true,
  description,
  examples,
  propsInfo: {
    size: {
      validation: {
        type: 'range',
        min: 1,
        max: 5,
      },
    },
  },
};
