import description from './form_select.md';

export default {
  description,

  followDesignSystem: false,
  bootstrapComponent: 'b-form-select',
  events: [
    {
      event: 'change',
      description: 'Emitted with the select value changes via user interaction.',
    },
    {
      event: 'input',
      description: 'Emitted with the select value changes.',
    },
  ],
  slots: [
    {
      name: 'first',
      description: 'Slot to place option tags above options provided via options prop',
    },
  ],
};
