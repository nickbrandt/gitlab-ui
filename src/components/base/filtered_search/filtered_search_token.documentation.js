import * as description from './filtered_search_token.md';

export default {
  description,
  bootstrapComponent: null,
  propsInfo: {
    title: {
      additionalInfo: 'Token title',
    },
    operators: {
      additionalInfo:
        'Available operators. Each operator is an object with required field `operator` and optional fields `description` and `default`',
      default: [
        { operator: '=', description: 'is', default: 'true' },
        { operator: '!=', description: 'is not' },
      ],
    },
    options: {
      additionalInfo:
        'Array of possible options. Forces this token act as dropdown instead of free input if provided',
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
