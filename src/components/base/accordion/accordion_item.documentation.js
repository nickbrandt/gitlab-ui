import description from './accordion_item.md';
import examples from './examples';

export default {
  description,
  examples,
  bootstrapComponent: 'b-collapse',
  propsInfo: {
    title: {
      additionalInfo: 'Used to set the title of accordion link.',
    },
    visible: {
      additionalInfo: 'When set, it will ensure the accordion item is initially visible.',
    },
    headerLevel: {
      additionalInfo:
        'The header tag used in the accordion (h1/h2/h3/h4/h5/h6). This overrides the value provided by GlAccordion. For accessibility this should be set to an appropriate value in the context where the accordion is used.',
    },
  },
};
