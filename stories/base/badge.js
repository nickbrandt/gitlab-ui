import { withKnobs } from '@storybook/addon-knobs/vue';
import documentedStoriesOf from '../utils/documented_stories';

const template = `
  <div>
    <gl-badge/>
  </div>
  `;

documentedStoriesOf('base|badge', '')
  .addDecorator(withKnobs)
  .add('default', () => ({
    template,
  }));
