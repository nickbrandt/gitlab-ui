export default {
  followsDesignSystem: true,

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
