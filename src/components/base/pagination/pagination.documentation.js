import examples from './examples';
import description from './pagination.md';

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
        'Text for the ellipsis (overridden by "ellipsis-left" and "ellipsis-right" slots)',
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
    align: {
      additionalInfo:
        'Controls the component\'s horizontal alignment, value should be one of "left", "center", "right" or "fill"',
    },
  },
  events: [
    {
      event: 'input',
      description: 'Emitted when the page changes',
      args: [
        {
          arg: 'value',
          description: 'The page that just got loaded',
        },
      ],
    },
    {
      event: 'next',
      description: 'Emitted when the "next" button is clicked',
    },
    {
      event: 'previous',
      description: 'Emitted when the "previous" button is clicked',
    },
  ],
  slots: [
    {
      name: 'previous',
      description: `Content for the "previous" button. Overrides the "prevText" prop.`,
      scopedProps: `{ active: boolean, disabled: boolean, page: number }`,
    },
    {
      name: 'next',
      description: `Content for the "next" button. Overrides the "nextText" prop.`,
      scopedProps: `{ active: boolean, disabled: boolean, page: number }`,
    },
    {
      name: 'page-number',
      description: `Content for page number buttons.`,
      scopedProps: `{ active: boolean, disabled: boolean, page: number }`,
    },
    {
      name: 'ellipsis-left',
      description: `Content for the left ellipsis. Overrides the "ellipsisText" prop.`,
    },
    {
      name: 'ellipsis-right',
      description: `Content for the right ellipsis. Overrides the "ellipsisText" prop.`,
    },
  ],
};
