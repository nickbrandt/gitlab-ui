import description from './sparkline.md';

import { sparkline } from '../../../utils/charts/theme';

export default {
  followsDesignSystem: false,
  description,

  propsInfo: {
    variant: {
      additionalInfo: `options: ${Object.keys(sparkline.variants).join(', ')}`,
    },
  },
};
