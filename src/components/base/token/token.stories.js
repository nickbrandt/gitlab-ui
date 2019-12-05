import { withKnobs, boolean } from '@storybook/addon-knobs';
import documentedStoriesOf from '../../../../documentation/documented_stories';
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
  };
}

documentedStoriesOf('base|token', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    components,
    template: `
      <div class="gl-display-flex"><gl-token :view-only="viewOnly">Token</gl-token></div>`,
  }));
