import { withKnobs, select } from '@storybook/addon-knobs/vue';
import documentedStoriesOf from '../../../../utils/documented_stories';
import { GlTabs, GlTab } from '../../../../../index';
import { glThemes } from '../../../../utils/constants';

const createBaseStory = () => ({
  components: {
    GlTabs,
    GlTab,
  },
  props: {
    theme: {
      type: String,
      default: select('theme', glThemes, 'indigo'),
    },
  },
});

documentedStoriesOf('base|tabs/tabs', '')
  .addDecorator(withKnobs)
  .add('default', () => ({
    ...createBaseStory(),
    template: `
      <gl-tabs :theme="theme">
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
    ...createBaseStory(),
    template: `
      <gl-tabs :theme="theme">
        <gl-tab title="Regular tab">
          <p>Regular tab content.</p>
          <p>The contentless tab is not selectable, as it has no content. This is useful for displaying things that aren't really tabs after the list of tabs.</p>
        </gl-tab>
        <gl-tab title="Another tab">
          <p>Another tab's content.</p>
        </gl-tab>
        <template v-slot:tabs>
          <li class="gl-tab-nav-item">
            Contentless tab
          </li>
        </template>
      </gl-tabs>
    `,
  }))
  .add('empty state', () => ({
    ...createBaseStory(),
    template: `
      <gl-tabs :theme="theme">
        <template v-slot:empty>
          This content is only displayed when there are no tabs. Useful for dynamically added/removed tabs.
        </template>
      </gl-tabs>
    `,
  }));
