import description from './search_box_by_click.md';
import examples from './examples';

export default {
  followsDesignSystem: true,
  description,
  examples,
  events: [
    {
      event: 'submit',
      args: [
        {
          arg: 'tokens',
          description: '(Array)',
        },
      ],
      description: 'Emitted when search is submitted',
    },
  ],
  slots: [
    {
      name: 'history-item',
      description:
        'Slot to customize history item in history dropdown. Used only with history-items prop',
    },
  ],
};
