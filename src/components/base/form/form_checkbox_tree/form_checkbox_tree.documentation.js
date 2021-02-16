import examples from './examples';
import * as description from './form_checkbox_tree.md';
import { V_MODEL } from './models/constants';

export default {
  description,
  examples,
  propsInfo: {
    options: {
      additionalInfo: 'The options tree.',
    },
    [V_MODEL.PROP]: {
      additionalInfo: 'The selected options as an array of values.',
    },
    hideToggleAll: {
      additionalInfo: 'Set to true to hide the "Select/unselect all" checkbox',
    },
    selectAllLabel: {
      additionalInfo: 'Label for the toggle all checkbox when some or all options are unchecked',
    },
    unselectAllLabel: {
      additionalInfo: 'Label for the toggle all checkbox when all options are checked',
    },
  },
  events: [
    {
      event: V_MODEL.EVENT,
      description: 'Emitted the selection changes.',
    },
  ],
};
