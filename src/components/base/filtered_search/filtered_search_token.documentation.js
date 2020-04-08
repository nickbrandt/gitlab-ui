import * as description from './filtered_search_token.md';

export default {
  description,
  bootstrapComponent: null,
  propsInfo: {
    title: {
      additionalInfo: 'Token title',
    },
    config: {
      additionalInfo: 'Token configuration with available operators and options',
    },
    active: {
      additionalInfo: 'If this token is currently active',
    },
    value: {
      additionalInfo: 'Current value',
    },
    replace: {
      args: [{ arg: 'token', description: '(Object) Replacement token configuration' }],
      description: 'Emitted when this token is converted to another type',
    },
  },
  slots: [
    { name: 'view', description: 'Template for token value in inactive state' },
    {
      name: 'suggestions',
      description: 'Slot for rendering autocomplete suggestions when no options are provided.',
    },
  ],
};
