import * as description from './form_combobox.md';

export default {
  followsDesignSystem: true,
  description,

  events: [
    {
      event: 'value-selected',
      description: 'Emitted when a value is selected.',
    },
  ],
};
