import { withKnobs } from '@storybook/addon-knobs/vue';
import documentedStoriesOf from '../../../../utils/documented_stories';
import { GlTabs, GlTab } from '../../../../index';

const components = {
  GlTabs,
  GlTab,
};

documentedStoriesOf('base|tabs/tabs', '')
  .addDecorator(withKnobs)
  .add('default', () => ({
    components,
    template: `
      <gl-tabs>
        <gl-tab title="First">
          first tab content
        </gl-tab>
        <gl-tab title="Second">
          second tab content
        </gl-tab>
      </gl-tabs>
    `,
  }))
  .add('contentless tab', () => ({
    components,
    template: `
      <gl-tabs>
        <gl-tab title="Regular tab">
          <p>Regular tab content.</p>
          <p>The contentless tab is not selectable, as it has no content. This is useful for displaying things that aren't really tabs after the list of tabs.</p>
        </gl-tab>
        <gl-tab title="Another tab">
          <p>Another tab's content.</p>
        </gl-tab>
        <template v-slot:tabs>
          <li class="nav-item align-self-center">
            Contentless tab
          </li>
        </template>
      </gl-tabs>
    `,
  }))
  .add('empty state', () => ({
    components,
    template: `
      <gl-tabs>
        <template v-slot:empty>
          This content is only displayed when there are no tabs. Useful for dynamically added/removed tabs.
        </template>
      </gl-tabs>
    `,
  }));
