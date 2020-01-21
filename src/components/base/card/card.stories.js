import { withKnobs } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './card.md';
import { GlCard } from '../../../../index';

const components = {
  GlCard,
};

documentedStoriesOf('base|card', readme)
  .addDecorator(withKnobs)
  .add('default card', () => ({
    components,
    template: `
    <gl-card>
    <template #header>
      <h3>This is a custom header</h3>
    </template>
    Hello World
    <template #footer>
      <span>This is a custom footer</span>
    </template>
  </gl-card>`,
  }));
