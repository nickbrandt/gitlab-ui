import description from './search_box_by_click.md';
import examples from './examples';

export default {
  followsDesignSystem: true,
  description,
  examples,
  propsInfo: {
    value: {
      additionalInfo: 'If provided, used as value of search input',
    },
    historyItems: {
      type: Array,
      required: false,
      additionalInfo: 'If provided, used as history items for this component',
    },
    placeholder: {
      type: String,
      required: false,
      additionalInfo: 'If provided, used as history items for this component',
    },
    disabled: {
      type: Boolean,
      required: false,
      additionalInfo: 'If provided and true, disables the input and controls',
    },
    recentSearchesHeader: {
      type: String,
      required: false,
      default: 'Recent searches',
      additionalInfo: 'i18n for recent searches title within history dropdown',
    },
    clearButtonTitle: {
      type: String,
      required: false,
      default: 'Clear',
      additionalInfo: 'i18n for clear button title',
    },
    closeButtonTitle: {
      type: String,
      required: false,
      default: 'Close',
      additionalInfo: 'i18n for close button title within history dropdown',
    },
    clearRecentSearchesText: {
      type: String,
      required: false,
      default: 'Clear recent searches',
      additionalInfo: 'i18n for recent searches clear text',
    },
    tooltipContainer: {
      additionalInfo:
        'Container for tooltip. Valid values: DOM node, selector string or `false` for default',
    },
  },
  events: [
    {
      event: 'submit',
      args: [
        {
          arg: 'tokens',
          description: '(Array)',
        },
      ],
      description: 'Emitted when search is submitted',
    },
  ],
  slots: [
    {
      name: 'history-item',
      description:
        'Slot to customize history item in history dropdown. Used only with history-items prop',
    },
  ],
};
