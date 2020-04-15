import description from './button.md';
import examples from './examples';

export default {
  description,
  examples,
  followsDesignSystem: false,
  bootstrapComponent: 'b-button',
  bootstrapPropsInfo: {
    category: {
      enum: 'newButtonCategoryOptions',
    },
    variant: {
      enum: 'newButtonVariantOptions',
    },
    size: {
      enum: 'newButtonSizeOptions',
    },
  },
  events: [
    {
      event: 'click',
      description: 'Emitted when clicked on button',
    },
  ],
};
