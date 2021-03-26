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
    headerLevel: {
      additionalInfo:
        'The header tag used in the accordion (h1/h2/h3/h4/h5/h6). For accessibility this should be set to an appropriate value in the context where the accordion is used.',
    },
  },
};
