import examples from './examples';
import description from './form_radio_group.md';

export default {
  description,
  examples,
  followsDesignSystem: true,
  bootstrapComponent: 'b-form-radio-group',
  propsInfo: {
    options: {
      additionalInfo: 'Array of objects representing the radios to render',
    },
    valueField: {
      additionalInfo: 'Field name in the options prop that should be used for the value',
    },
    textField: {
      additionalInfo: 'Field name in the options prop that should be used for the text label',
    },
    htmlField: {
      additionalInfo:
        'Field name in the options prop that should be used for the html label instead of text field. Use with caution.',
    },
    disabledField: {
      additionalInfo: 'Field name in the options prop that should be used for the disabled state',
    },
    checked: {
      additionalInfo: 'The current value of the checked radio in the group',
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
      name: 'first',
      description:
        'Slot for GlFormRadios that will appear before radios generated from options prop',
    },
    {
      name: 'default',
      description:
        'Slot for GlFormRadios that will appear after radios generated from options prop',
    },
  ],
};
