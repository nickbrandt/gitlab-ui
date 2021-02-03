import { sparkline } from '../../../utils/charts/theme';
import description from './sparkline.md';
import examples from './examples';

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
