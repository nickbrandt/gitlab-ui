import description from './infinite_scroll.md';
import examples from './examples';

export default {
  description,
  examples,
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
};
