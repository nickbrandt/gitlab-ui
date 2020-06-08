import { withKnobs } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './slide_down.md';
import { GlSlideDown } from '../../../../index';

const components = {
  GlSlideDown,
};

documentedStoriesOf('utilities|slide_down', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components,
    template: `
      <gl-slide-down></gl-slide-down>
    `,
  }));
