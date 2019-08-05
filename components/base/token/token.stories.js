import { withKnobs } from '@storybook/addon-knobs';
import documentedStoriesOf from '../../../utils/documented_stories';
import readme from './token.md';
import { GlToken } from '../../../index';

const components = {
  GlToken,
};

documentedStoriesOf('base|token', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components,
    template: `
      <gl-token>Token</gl-token>`,
  }));
