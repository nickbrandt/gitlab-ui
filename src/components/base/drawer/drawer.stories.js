import { withKnobs } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import GlDrawer from './drawer.vue';
import { GlNewButton } from '../../../../index';
import readme from './drawer.md';

const components = {
  GlDrawer,
  GlButton: GlNewButton,
};

documentedStoriesOf('base|drawer', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    methods: {
      toggle() {
        this.open = !this.open;
      },
      close() {
        this.open = false;
      },
    },
    data() {
      return {
        open: true,
      };
    },
    components,
    template: `
      <div>
        <gl-button @click="toggle">Toggle Drawer</gl-button>
        <gl-drawer :open="open" @close="close">
          <template #header>List Settings</template>
          <template>
            <div>
              <label class="gl-font-weight-bold">One</label>
              <span>None</span>
            </div>
            <div>
              <label class="gl-font-weight-bold">Two</label>
              <span>None</span>
            </div>
            <div>
              <label class="gl-font-weight-bold">Three</label>
              <span>None</span>
            </div>
            <div>
              <label class="gl-font-weight-bold">Four</label>
              <span>None</span>
            </div>
            <div>
              <label class="gl-font-weight-bold">Five</label>
              <span>None</span>
            </div>
            <div>
              <label class="gl-font-weight-bold">Six</label>
              <span>None</span>
            </div>
            <div>
              <label class="gl-font-weight-bold">Seven</label>
              <span>None</span>
            </div>
            <div>
              <label class="gl-font-weight-bold">Eight</label>
              <span>None</span>
            </div>
            <div>
              <label class="gl-font-weight-bold">Nine</label>
              <span>None</span>
            </div>
            <div>
              <label class="gl-font-weight-bold">Ten</label>
              <span>None</span>
            </div>
          </template>
        </gl-drawer>
    </div>
    `,
  }));
