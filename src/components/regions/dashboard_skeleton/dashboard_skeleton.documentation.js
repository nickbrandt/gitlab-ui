import description from './dashboard_skeleton.md';
import examples from './examples';

export default {
  description,
  examples,
  propsInfo: {
    cards: {
      type: Number,
      required: false,
      default: 3,
    },
  },
};
