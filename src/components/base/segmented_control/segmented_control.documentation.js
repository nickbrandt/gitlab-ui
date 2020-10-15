import description from './segmented_control.md';

export default {
  followsDesignSystem: false,
  description,

  bootstrapComponent: 'b-form-radio-group',
  events: [
    {
      event: 'input',
      description: 'Emitted when the selection changes',
      args: [
        {
          arg: 'checked',
          description: 'The selected option',
        },
      ],
    },
  ],
};
