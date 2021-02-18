import examples from './examples';
import * as description from './toggle.md';

export default {
  description,
  followsDesignSystem: true,
  examples,
  events: [
    {
      event: 'change',
      description: 'Emitted when the state changes',
      args: [
        {
          arg: 'value',
          description: 'Whether the toggle is in the enabled',
        },
      ],
    },
  ],
};
