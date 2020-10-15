import description from './search_box_by_type.md';

export default {
  followsDesignSystem: true,
  description,
  propsInfo: {
    value: {
      additionalInfo: 'If provided, used as value of search input',
    },
    disabled: {
      additionalInfo: 'If provided and true, disables the input and controls',
    },
    isLoading: {
      additionalInfo: 'Puts search box into loading state, rendering spinner',
    },
    tooltipContainer: {
      additionalInfo:
        'Container for tooltip. Valid values: DOM node, selector string or `false` for default',
    },
  },

  bootstrapComponent: 'b-form-input',
};
