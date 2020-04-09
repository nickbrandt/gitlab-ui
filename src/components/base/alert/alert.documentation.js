import * as description from './alert.md';
import examples from './examples';

export default {
  description,
  examples,
  followsDesignSystem: false,
  propsInfo: {
    primaryButtonText: {
      additionalInfo: 'If provided, renders a primary action button.',
    },
    primaryButtonLink: {
      additionalInfo: 'If provided, renders the primary button as a link.',
    },
    secondaryButtonText: {
      additionalInfo: 'If provided, renders a secondary action button.',
    },
    secondaryButtonLink: {
      additionalInfo: 'If provided, renders the secondary button as a link.',
    },
  },
  events: [
    {
      event: 'dismiss',
      description: 'Emitted when the dismiss button is clicked.',
    },
    {
      event: 'primaryAction',
      description: 'Emitted when the primary action button is clicked.',
    },
    {
      event: 'secondaryAction',
      description: 'Emitted when the secondary action button is clicked.',
    },
  ],
  slots: [
    {
      name: 'default',
      description: 'The alert message to display.',
    },
    {
      name: 'actions',
      description: `If the primary/secondary action buttons aren't flexible enough, place arbitrary content here.`,
    },
  ],
};
