import { withKnobs, boolean } from '@storybook/addon-knobs/vue';
import documentedStoriesOf from '../../../utils/documented_stories';
import { GlToggle } from '../../../index';

const components = {
  GlToggle,
};

documentedStoriesOf('base|toggle', '')
  .addDecorator(withKnobs)
  .add('default', () => ({
    components,
    data() {
      return {
        toggleTrue: true,
        toggleFalse: false,
      };
    },
    props: {
      disabled: {
        default: boolean('Disabled', false),
      },
      isLoading: {
        default: boolean('Is loading', false),
      },
    },
    template: `
      <div>
        <gl-toggle v-model="toggleTrue" :disabled="disabled" :is-loading="isLoading" />
        <br>
        <gl-toggle v-model="toggleFalse" :disabled="disabled" :is-loading="isLoading" />
      </div>
    `,
  }));
