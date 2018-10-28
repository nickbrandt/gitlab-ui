import * as description from './loading_icon.md';
import { default as glLoadingIconExamples } from './examples';

export default {
  description,
  examples: glLoadingIconExamples,
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
