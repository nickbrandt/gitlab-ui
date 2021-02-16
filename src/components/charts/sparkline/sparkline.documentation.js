import { sparkline } from '../../../utils/charts/theme';
import examples from './examples';
import description from './sparkline.md';

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
