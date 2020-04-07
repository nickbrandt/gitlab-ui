import description from './form_checkbox.md';
import examples from './examples';

export default {
  description,
  examples,
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
