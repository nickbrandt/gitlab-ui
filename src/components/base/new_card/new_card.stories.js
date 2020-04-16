import { withKnobs } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './new_card.md';

import GlNewCard from './new_card.vue';

const components = {
  GlNewCard,
};

documentedStoriesOf('base|new_card', readme)
  .addDecorator(withKnobs)
  .add('default card', () => ({
    components,
    template: `
      <gl-new-card>
      <template #header>
        <h3>This is a custom header</h3>
      </template>
      Hello World
      <template #footer>
        <span>This is a custom footer</span>
      </template>
    </gl-new-card>`,
  }));
