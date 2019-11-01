import description from './pagination.md';
import examples from './examples';

export default {
  followsDesignSystem: true,
  description,
  examples,
  propsInfo: {
    perPage: {
      additionalInfo: 'Number of items per page',
    },
    totalItems: {
      additionalInfo: 'Total number of items',
    },
    limits: {
      additionalInfo: 'The object must contain the xs, sm, md and default keys',
    },
    linkGen: {
      additionalInfo:
        'A function that receives the page number and that returns a string representing the page URL',
    },
    prevPage: {
      additionalInfo:
        'When using the compact pagination, use this prop to pass the previous page number',
    },
    prevText: {
      additionalInfo: 'Text for the previous button (overridden by "previous" slot)',
    },
    nextPage: {
      additionalInfo:
        'When using the compact pagination, use this prop to pass the next page number',
    },
    nextText: {
      additionalInfo: 'Text for the next button (overridden by "next" slot)',
    },
    ellipsisText: {
      additionalInfo:
        'Text for the ellipsis (overridden by "ellipsis_left" and "ellipsis_right" slots)',
    },
    labelFirstPage: {
      additionalInfo: 'aria-label for the first page item',
    },
    labelPrevPage: {
      additionalInfo: 'aria-label for the previous page item',
    },
    labelNextPage: {
      additionalInfo: 'aria-label for the next page item',
    },
    labelLastPage: {
      additionalInfo: 'aria-label for the last page item',
    },
    labelPage: {
      additionalInfo:
        'aria-label getter for numbered page items, defaults to "Go to page <page_number>"',
    },
    size: {
      additionalInfo:
        'Controls the component\'s size, value should be one of "sm" or "lg", leave empty to use the default size',
    },
    align: {
      additionalInfo:
        'Controls the component\'s horizontal alignment, value should be one of "left", "center", "right" or "fill"',
    },
  },
};
