import examples from './examples';

export default {
  followsDesignSystem: false,
  examples,
  propsInfo: {
    variant: {
      type: String,
      required: false,
      default: 'default',
      additionalInfo: 'Token visual variants: default, search-type, and search-value.',
    },
  },
  events: [
    {
      event: 'close',
      description: 'Emitted when x is clicked',
    },
  ],
};
