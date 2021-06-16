import { withKnobs, select, boolean } from '@storybook/addon-knobs';
import { range } from 'lodash';
import { documentedStoriesOf } from '../../../../../documentation/documented_stories';
import { GlTabs, GlTab, GlScrollableTabs } from '../../../../../index';
import { colorThemes } from '../../../../utils/constants';
import docs from './tabs.md';

const ScrollableTabsGenerator = {
  components: {
    GlScrollableTabs,
    GlTab,
  },
  props: {
    count: {
      type: Number,
      required: true,
    },
  },
  computed: {
    tabs() {
      return range(this.count).map((i) => ({
        title: `Lorem ${i + 1}`,
        content: `(${i + 1}) Lorem ipsum dolar sit amit...`,
      }));
    },
  },
  template: `
    <gl-scrollable-tabs v-bind="$attrs">
      <gl-tab v-for="tab in tabs" :key="tab.title" :title="tab.title">
        {{ tab.content }}
      </gl-tab>
    </gl-scrollable-tabs>
  `,
};

const createBaseStory = () => ({
  components: {
    GlTabs,
    GlTab,
  },
  props: {
    theme: {
      type: String,
      default: select('theme', [...Object.keys(colorThemes), 'gl-dark'], 'indigo'),
    },
    syncActiveTabWithQueryParams: {
      type: Boolean,
      default: boolean('sync-active-tab-with-query-params', false),
    },
  },
});

documentedStoriesOf('base/tabs/tabs', docs)
  .addDecorator(withKnobs)
  .add('default', () => ({
    ...createBaseStory(),
    template: `
      <gl-tabs :theme="theme" :sync-active-tab-with-query-params="syncActiveTabWithQueryParams">
        <gl-tab title="First">
          first tab content
        </gl-tab>
        <gl-tab title="Second">
          second tab content
        </gl-tab>
        <gl-tab title="Third">
          third tab content
        </gl-tab>
        <gl-tab title="Fourth">
          fourth tab content
        </gl-tab>
        <gl-tab title="Fifth">
          fifth tab content
        </gl-tab>
        <gl-tab title="Sixth">
          sixth tab content
        </gl-tab>
        <gl-tab title="Seventh">
          seventh tab content
        </gl-tab>
        <gl-tab title="Eighth">
          eighth tab content
        </gl-tab>
        <gl-tab title="Ninth">
          ninth tab content
        </gl-tab>
        <gl-tab title="Tenth">
          tenth tab content
        </gl-tab>
        <gl-tab title="Eleventh">
          eleventh tab content
        </gl-tab>
        <gl-tab title="Twelfth">
          twelfth tab content
        </gl-tab>
        <gl-tab title="Thirteenth" query-param-value="thirteenth">
          thirteenth tab content
        </gl-tab>
        <gl-tab title="Fourteenth">
          fourteenth tab content
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
  }))
  .add('with scroll', () => ({
    ...createBaseStory(),
    components: {
      ScrollableTabsGenerator,
    },
    template: '<scrollable-tabs-generator :count="50" :theme="theme" />',
  }))
  .add(
    'with scroll and growing',
    () => ({
      ...createBaseStory(),
      components: {
        ScrollableTabsGenerator,
      },
      data() {
        return {
          count: 2,
          intervalId: 0,
        };
      },
      mounted() {
        this.intervalId = setInterval(() => {
          this.count += 1;
        }, 2000);
      },
      template: '<scrollable-tabs-generator :count="count" :theme="theme" />',
    }),
    { storyshots: false }
  );
