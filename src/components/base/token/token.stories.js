import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import {
  tokenVariants,
  tokenChevronSkippingPatternWeights,
  tokenChevronSkippingPatternPalette,
} from '../../../utils/constants';

import readme from './token.md';
import { GlToken } from '../../../../index';

const components = {
  GlToken,
};

function generateProps() {
  return {
    viewOnly: {
      type: Boolean,
      default: boolean('View-only', false),
    },
    variant: {
      type: String,
      default: select('Variant', tokenVariants, GlToken.props.variant.default),
    },
    categoryWeight: {
      type: String,
      default: select(
        'Category Weight',
        tokenChevronSkippingPatternWeights,
        GlToken.props.categoryWeight.default
      ),
    },
    categoryPalette: {
      type: String,
      default: select(
        'Category Palette',
        tokenChevronSkippingPatternPalette,
        GlToken.props.categoryPalette.default
      ),
    },
  };
}

documentedStoriesOf('base|token', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    components,
    template: `
      <div class="gl-display-flex"><gl-token :variant="variant" :view-only="viewOnly" :category-weight="categoryWeight" :category-palette="categoryPalette">Token</gl-token></div>`,
  }))
  .add('search-type', () => ({
    components,
    template: `
      <div class="gl-display-flex"><gl-token variant="search-type">Token search type</gl-token></div>`,
  }))
  .add('search-value', () => ({
    components,
    template: `
      <div class="gl-display-flex"><gl-token variant="search-value">Token search value</gl-token></div>`,
  }))
  .add('categorical-data', () => ({
    components,
    template: `
      <div class="gl-display-flex"><gl-token category-weight="500" category-palette="magenta">Token categorical data</gl-token></div>`,
  }));
