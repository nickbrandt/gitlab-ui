import * as description from './filtered_search.md';
import examples from './examples';

export default {
  followsDesignSystem: true,
  description,
  bootstrapComponent: null,
  examples,
  propsInfo: {
    value: {
      additionalInfo: 'If provided, used as value of filtered search',
    },
    historyItems: {
      type: Array,
      required: false,
      additionalInfo: 'If provided, used as history items for this component',
    },
    availableTokens: {
      type: Array,
      required: true,
      additionalInfo: 'Available tokens',
    },
    placeholder: {
      type: String,
      required: false,
      additionalInfo: 'If provided, used as history items for this component',
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
        'Slot to customize history item in history dropdown. Used only if using history items',
    },
  ],
};
