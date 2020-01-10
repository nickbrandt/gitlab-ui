import description from './form_input_group.md';
import examples from './examples';

export default {
  followsDesignSystem: false,
  description,
  examples,
  bootstrapComponent: 'b-form-input',
  propsInfo: {
    'select-on-click': {
      type: Boolean,
      additionalInfo: 'Automatically selects the content of the input field on click',
    },
    'predefined-options': {
      type: Array,
      additionalInfo:
        'Array of options. Each option should have `name` and `value` information: {name: "Foo", value: "Bar"})',
    },
  },
  slots: [
    {
      name: 'prepend',
      description: 'Is rendered in front of the input field.',
    },
    {
      name: 'append',
      description: 'Is rendered after the input field.',
    },
  ],
};
