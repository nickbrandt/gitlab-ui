import description from './button.md';

export default {
  description,
  followsDesignSystem: true,
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
