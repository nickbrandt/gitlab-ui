import * as description from './keyset_pagination.md';
import examples from './examples';

export default {
  description,
  followsDesignSystem: true,
  bootstrapComponent: false,
  examples,
  propsInfo: {
    hasPreviousPage: {
      type: Boolean,
      required: false,
      default: false,
      additionalInfo: 'Whether or not the "Prev" button should be enabled',
    },
    hasNextPage: {
      type: Boolean,
      required: false,
      default: false,
      additionalInfo: 'Whether or not the "Next" button should be enabled',
    },
    startCursor: {
      type: String,
      required: false,
      default: null,
      additionalInfo:
        'A cursor that points to the first item in the current page. Will be passed as an event parameter when the "prev" event is fired.',
    },
    endCursor: {
      type: String,
      required: false,
      default: null,
      additionalInfo:
        'A cursor that points to the last item in the current page. Will be passed as an event parameter when the "next" event is fired.',
    },

    prevText: {
      type: String,
      required: false,
      default: 'Prev',
      additionalInfo:
        'The text that will be rendered inside the "Prev" button. It\'s important to provide this parameter since the default text is not translatable.',
    },
    prevButtonLink: {
      type: String,
      required: false,
      default: null,
      additionalInfo:
        'A link that will be used as the "Prev" button\'s "href" attribute. If provided, the "Prev" button renders as a link button; otherwise, it is rendered as a regular button.',
    },
    nextText: {
      type: String,
      required: false,
      default: 'Next',
      additionalInfo:
        'The text that will be rendered inside the "Next" button. It\'s important to provide this parameter since the default text is not translatable.',
    },
    nextButtonLink: {
      type: String,
      required: false,
      default: null,
      additionalInfo:
        'A link that will be used as the "Next" button\'s "href" attribute. If provided, the "Next" button renders as a link button; otherwise, it is rendered as a regular button.',
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
      additionalInfo:
        'Whether or not both buttons should be disabled (regardless of the "hasPreviousPage" and "hasNextPage" values).',
    },
  },
  events: [
    {
      event: 'prev',
      description: 'Emitted when the "Prev" button is clicked',
      args: [
        {
          arg: 'startCursor',
          description: 'A cursor that points to the first item in the current page.',
        },
      ],
    },
    {
      event: 'next',
      description: 'Emitted when the "Next" button is clicked',
      args: [
        {
          arg: 'endCursor',
          description: 'A cursor that points to the last item in the current page',
        },
      ],
    },
  ],
  slots: [
    {
      name: 'previous-button-content',
      description: 'Used to customize the appearance of the "Prev" button',
    },
    {
      name: 'next-button-content',
      description: 'Used to customize the appearance of the "Next" button',
    },
  ],
};
