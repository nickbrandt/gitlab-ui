import * as description from './new_button.md';
import examples from './examples';

export default {
  description,
  examples,
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
