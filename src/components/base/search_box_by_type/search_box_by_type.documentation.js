import description from './search_box_by_type.md';
import examples from './examples';

export default {
  followsDesignSystem: true,
  description,
  propsInfo: {
    value: {
      additionalInfo: 'If provided, used as value of search input',
    },
    isLoading: {
      additionalInfo: 'Puts search box into loading state, rendering spinner',
    },
    tooltipContainer: {
      additionalInfo:
        'Container for tooltip. Valid values: DOM node, selector string or `false` for default',
    },
  },
  examples,
  bootstrapComponent: 'b-form-input',
};
