import * as description from './intersection_observer.md';
import examples from './examples';

export default {
  description,
  examples,
  propsInfo: {
    options: {
      additionalInfo: 'Extra options to pass directly to the intersection observer API.',
    },
  },
  events: [
    {
      event: 'appear',
      description: 'Emitted when the element appears on the page',
    },
    {
      event: 'disappear',
      description: 'Emitted when the element disappears from the page',
    },
  ],
  slots: [
    {
      slot: 'default',
      description: "The element you wish to observe, or a fallback if the observer doesn't work.",
    },
  ],
};
