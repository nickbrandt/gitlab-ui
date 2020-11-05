import * as description from './card.md';
import examples from './examples';

export default {
  followsDesignSystem: true,
  description,
  examples,
  propsInfo: {
    headerClass: {
      additionalInfo: 'Additional CSS class(es) to be applied to the header',
    },
    bodyClass: {
      additionalInfo: 'Additional CSS class(es) to be applied to the body',
    },
    footerClass: {
      additionalInfo: 'Additional CSS class(es) to be applied to the footer',
    },
  },
  slots: [
    {
      name: 'header',
      description: "The card's header content",
    },
    {
      name: 'default',
      description: "The card's main content.",
    },
    {
      name: 'footer',
      description: "The card's footer content",
    },
  ],
};
