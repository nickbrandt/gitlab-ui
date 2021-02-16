import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { GlToken } from '../../../../index';
import { tokenVariants } from '../../../utils/constants';

import readme from './token.md';

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
  };
}

documentedStoriesOf('base/token', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    components,
    template: `
      <div class="gl-display-flex"><gl-token :variant="variant" :view-only="viewOnly">Token</gl-token></div>`,
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
  }));
