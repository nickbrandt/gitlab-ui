import description from './infinite_scroll.md';

export default {
  followsDesignSystem: true,
  description,

  propsInfo: {
    totalItems: {
      additionalInfo: 'Total number of items available',
    },
    fetchedItems: {
      additionalInfo: 'Numbers of items fetched before scrolling',
    },
    maxListHeight: {
      additionalInfo: 'Max height of the list before the scrollbar appears',
    },
  },
  events: [
    {
      event: '@topReached',
      description: 'Emitted when item container is scrolled to the top',
    },
    {
      event: '@bottomReached',
      description: 'Emitted when item container is scrolled to the bottom',
    },
  ],
  slots: [
    {
      name: 'default',
      description: 'Footer of the list, appears below the items',
    },
    {
      name: 'header',
      description: 'Header of the list, appears above the items',
    },

    {
      name: 'items',
      description: 'List of items',
    },
  ],
};
