import * as description from './filtered_search_binary_token.md';

export default {
  description,
  bootstrapComponent: null,
  propsInfo: {
    title: {
      additionalInfo: 'Token title',
    },
    active: {
      additionalInfo: 'If this token is currently active',
    },
    value: {
      additionalInfo: 'Current value',
    },
  },
  slots: [
    { name: 'view', description: 'Template for token value in inactive state' },
    { name: 'suggestions', description: 'Slot for rendering autocomplete suggestions' },
  ],
};
