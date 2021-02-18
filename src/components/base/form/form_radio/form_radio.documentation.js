import examples from './examples';
import description from './form_radio.md';

export default {
  description,
  examples,
  followsDesignSystem: true,
  bootstrapComponent: 'b-form-radio',
  propsInfo: {
    checked: {
      additionalInfo: 'The current value of the radio(s)',
    },
  },
  events: [
    {
      event: 'input',
      args: [{ arg: 'checked', description: 'current selected value of radio group' }],
      description: 'Emitted when the selected value is changed',
    },
    {
      event: 'change',
      args: [{ arg: 'checked', description: 'current selected value of radio group' }],
      description: 'Emitted when the selected value is changed due to user interaction',
    },
  ],
  slots: [
    {
      name: 'help',
      description:
        'Content provided here will be shown beneath the radio. Typically used for help or descriptive text.',
    },
    {
      name: 'default',
      description: 'Content to use for the label',
    },
  ],
};
