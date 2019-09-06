import * as description from './datepicker.md';
import examples from './examples';

export default {
  description,
  examples,
  propsInfo: {
    container: {
      additionalInfo: 'DOM node to render calendar into',
    },
    field: {
      additionalInfo:
        'Bind datepicker to a form field. If provided, default form field won’t be rendered.',
    },
    disableDayFn: {
      additionalInfo:
        'Accepts a function that accepts a date as argument and returns true if the date is disabled.',
    },
  },
  events: [
    {
      event: 'input',
      description: 'Emitted when a new date has been selected.',
      args: [
        {
          arg: 'date',
          description: 'The selected date',
        },
      ],
    },
    {
      event: 'close',
      description: 'Emitted when the datepicker is hidden.',
    },
    {
      event: 'open',
      description: 'Emitted when the datepicker becomes visible.',
    },
    {
      event: 'draw',
      description: 'Emitted when the datepicker draws a new month.',
    },
  ],
};
