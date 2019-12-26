import * as description from './filtered_search_static_binary_token.md';

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
    items: {
      additionalInfo: '(Array) Available options',
    },
  },
};
