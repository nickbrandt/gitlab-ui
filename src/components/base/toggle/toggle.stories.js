import { withKnobs, boolean } from '@storybook/addon-knobs/vue';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { GlToggle } from '../../../../index';

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
        toggleTrue2: true,
        toggleTrue3: true,
        toggleTrue4: true,
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
      <div class="gl-font-base">
        <gl-toggle v-model="toggleTrue" :disabled="disabled" :is-loading="isLoading" />
        <br>
        <gl-toggle v-model="toggleFalse" :disabled="disabled" :is-loading="isLoading" />
        <br>
        <h4 class="gl-font-lg gl-font-weight-bold gl-mb-2 mt-2">Visible label, position: top</h4>
        <gl-toggle v-model="toggleTrue2" label-position="top" />
        <h4 class="gl-font-lg gl-font-weight-bold gl-mb-2 mt-2">Visible label, position: right</h4>
        <gl-toggle v-model="toggleTrue3" label-position="right" />
        <h4 class="gl-font-lg gl-font-weight-bold gl-mb-2 mt-2">Visible custom label using slots</h4>
        <gl-toggle v-model="toggleTrue4" label-position="right">
          <template #labelOn>
            <span><span class="sr-only">Keyboard shortcuts</span>Enabled</span>
          </template>
          <template #labelOff>
            <span><span class="sr-only">Keyboard shortcuts</span>Disabled</span>
          </template>
        </gl-toggle>
      </div>
    `,
  }));
