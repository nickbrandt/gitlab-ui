import examples from './examples';
import description from './segmented_control.md';

export default {
  followsDesignSystem: false,
  description,
  examples,
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
