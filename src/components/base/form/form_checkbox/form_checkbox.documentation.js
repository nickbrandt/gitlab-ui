import description from './form_checkbox.md';

export default {
  description,

  bootstrapComponent: 'b-form-checkbox',
  followsDesignSystem: true,
  events: [
    {
      event: 'input',
      description: 'Emitted when checked state changes',
      args: [
        {
          arg: 'checked',
          description: 'Whether the checkbox is checked',
        },
      ],
    },
  ],
};
