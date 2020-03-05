import * as description from './filtered_search_token_segment.md';

export default {
  description,
  bootstrapComponent: null,
  propsInfo: {
    active: {
      additionalInfo: 'If this term token is currently active',
    },
    options: {
      additionalInfo: '',
    },
    optionTextField: {
      additionalInfo: '',
    },
    customInputKeydownHandler: {
      additionalInfo: '',
    },
    value: {
      additionalInfo: 'Current term value',
    },
  },
  events: [
    { event: 'mousedown', description: 'Emitted on mousedown event on main component' },
    { event: 'backspace', description: 'Emitted when Backspace is pressed and value is empty' },
    { event: 'complete', description: 'Emitted when suggestion is selected from suggestion list' },
    {
      event: 'split',
      args: [
        {
          arg: 'newStrings',
          description: '(Array of strings) New strings to be converted into term tokens',
        },
      ],
      description: 'Emitted when Space appears in token segment value',
    },
  ],
};
