import description from './accordion.md';
import examples from './examples';

export default {
  followsDesignSystem: true,
  description,
  examples,
  bootstrapComponent: 'b-collapse',
  propsInfo: {
    autoCollapse: {
      additionalInfo:
        'When true, will have the effect of closing other accordion items when one accordion item is visible.',
    },
    headerLevel: {
      additionalInfo:
        'The header tag used in the accordion (h1/h2/h3/h4/h5/h6). This overrides the value provided by GlAccordion. For accessibility this should be set to an appropriate value in the context where the accordion is used.',
    },
  },
};
