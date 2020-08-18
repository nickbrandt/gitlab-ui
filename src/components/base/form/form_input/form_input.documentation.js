import description from './form_input.md';
import examples from './examples/form_input';

export default {
  description,
  examples,
  bootstrapComponent: 'b-form-input',
  followsDesignSystem: true,
  propsInfo: {
    size: {
      additionalInfo: 'Maximum width of the input',
      enum: 'formInputSizes',
    },
  },
  events: [
    {
      event: 'input',
      args: [
        {
          arg: 'value',
          description: '(String)',
        },
      ],
      description: 'Emitted to update the v-model',
    },
    {
      event: 'update',
      args: [
        {
          arg: 'value',
          description: '(String)',
        },
      ],
      description: `Triggered by user interaction. Emitted after any formatting (not including 'trim' or 'number' props). Useful for getting the currently entered value when the 'debounce' or 'lazy' props are set.`,
    },
  ],
};
