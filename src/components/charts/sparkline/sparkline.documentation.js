import description from './sparkline.md';
import examples from './examples';

import { sparkline } from '../../../utils/charts/theme';

export default {
  followsDesignSystem: false,
  description,
  examples,
  propsInfo: {
    variant: {
      additionalInfo: `options: ${Object.keys(sparkline.variants).join(', ')}`,
    },
  },
};
