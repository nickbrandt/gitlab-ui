import examples from './examples';
import description from './tabs.md';

export default {
  description,
  examples,
  bootstrapComponent: 'b-tabs',
  followsDesignSystem: true,
  propsInfo: {
    syncActiveTabWithQueryParams: {
      additionalInfo:
        'Sync active tab with query string parameters. Allows for deep linking into specific tabs.',
    },
    queryParamName: {
      additionalInfo: 'Name to use for query string parameter.',
    },
  },
};
