import description from './daterange_picker.md';
import examples from './examples';

export default {
  followsDesignSystem: true,
  description,
  examples,
  events: [
    {
      event: 'start-picker-open',
      description: 'Emitted when the start date datepicker becomes visible.',
    },
    {
      event: 'start-picker-close',
      description: 'Emitted when the start date datepicker is hidden.',
    },
    {
      event: 'end-picker-open',
      description: 'Emitted when the end date datepicker becomes visible.',
    },
    {
      event: 'end-picker-close',
      description: 'Emitted when the end date datepicker is hidden.',
    },
  ],
};
