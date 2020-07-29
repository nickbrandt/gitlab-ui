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
};
