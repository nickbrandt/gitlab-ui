import * as description from './sorting.md';
import examples from './examples';

export default {
  description,
  bootstrapComponent: null,
  examples,
  events: [
    {
      event: 'sortDirectionChange',
      args: [
        {
          arg: 'isAscending',
          description:
            '(Boolean) will be true if the direction has been changed to ascending or false if descending',
        },
      ],
      description: 'Emitted when the sort direction button is clicked.',
    },
  ],
  slots: [
    {
      name: 'default',
      description: 'Slot to place the dropdown items, works best with a gl-sorting-item component.',
    },
  ],
};
