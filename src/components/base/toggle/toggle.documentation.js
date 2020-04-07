import examples from './examples';

export default {
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
