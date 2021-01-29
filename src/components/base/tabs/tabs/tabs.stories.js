import { withKnobs, select } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../../documentation/documented_stories';
import { GlTabs, GlTab } from '../../../../../index';
import { glThemes } from '../../../../utils/constants';
import docs from './tabs.md';

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

documentedStoriesOf('base/tabs/tabs', docs)
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
        <template #tabs-end>
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
        <template #empty>
          This content is only displayed when there are no tabs. Useful for dynamically added/removed tabs.
        </template>
      </gl-tabs>
    `,
  }))
  .add('justified tabs', () => ({
    ...createBaseStory(),
    template: `
      <gl-tabs :theme="theme" justified>
        <gl-tab title="First tab">
          <p>First content</p>
        </gl-tab>
        <gl-tab title="Second tab">
          <p>Second content</p>
        </gl-tab>
      </gl-tabs>
    `,
  }))
  .add('with counter badges', () => ({
    ...createBaseStory(),
    template: `
      <gl-tabs>
        <gl-tab>
          <template slot="title">
            <span>1st</span>
            <gl-badge size="sm" class="gl-tab-counter-badge">500</gl-badge>
          </template>
          first content
        </gl-tab>
        <gl-tab>
          <template slot="title">
            <span>2nd</span>
            <gl-badge size="sm" class="gl-tab-counter-badge">250</gl-badge>
          </template>
          second content
        </gl-tab>
        <gl-tab>
          <template slot="title">
            <span>3rd</span>
          </template>
          third content
        </gl-tab>
      </gl-tabs>
    `,
  }));
