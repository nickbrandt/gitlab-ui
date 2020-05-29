import description from './datepicker.md';
import examples from './examples';

export default {
  followsDesignSystem: true,
  description,
  examples,
  propsInfo: {
    target: {
      additionalInfo:
        'Selector of element that triggers the datepicker. Defaults to the calendar icon. Pass `null` to trigger on input focus.',
    },
    container: {
      additionalInfo:
        'DOM node to render calendar into. Defaults to the datepicker container. Pass `null` to use Pikaday default.',
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
  slots: [
    {
      name: 'default',
      description:
        '(optional) Input to display and bind the datepicker to. Defaults to `<gl-form-input />`',
      scopedProps: `{ formattedDate: string }`,
    },
  ],
};
