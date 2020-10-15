import description from './deprecated_button.md';

export default {
  description,

  bootstrapComponent: 'b-button',
  bootstrapPropsInfo: {
    variant: {
      enum: 'buttonVariantOptions',
    },
  },
  events: [
    {
      event: 'click',
      description: 'Emitted when clicked on button',
    },
  ],
};
