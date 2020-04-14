import * as description from './form_checkbox_tree.md';
import examples from './examples';
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
  },
  events: [
    {
      event: V_MODEL.EVENT,
      description: 'Emitted the selection changes.',
    },
  ],
};
