import description from './accordion_item.md';
import examples from './examples';

export default {
  description,
  examples,
  propsInfo: {
    title: {
      additionalInfo: 'Used to set the title of accordion link.',
    },
    visible: {
      additionalInfo: 'When set, it will ensure the accordion item is initially visible.',
    },
    accordion: {
      additionalInfo:
        'The name of the accordion group that this accordion item belongs to. Supplying an accordion group identifier will provide the effect of closing other accordion item when one accordion item is visible.',
    },
  },
};
