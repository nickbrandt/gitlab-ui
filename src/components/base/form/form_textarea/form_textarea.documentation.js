import description from './form_textarea.md';

export default {
  description,

  bootstrapComponent: 'b-form-textarea',
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
