import BasicTabsExample from './tabs.basic.example.vue';
import DisabledTabExample from './tabs.disabled.example.vue';
import CustomTitleExample from './tabs.custom_title.example.vue';
import ContentlessTabExample from './tabs.contentless_tab.example.vue';
import NoTabsExample from './tabs.no_tabs.example.vue';
import TabsWithCounterBadgesExample from './tabs.counterbadges.example.vue';
import TabsStylesOnlyExample from './tabs.styles_only.example.vue';
import JustifiedTabsExample from './tabs.justified.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'tabs-basic',
        name: 'Basic',
        description: 'Basic Tabs',
        component: BasicTabsExample,
      },
      {
        id: 'tabs-disabled',
        name: 'Disabled',
        description: 'Disabled Tab',
        component: DisabledTabExample,
      },
      {
        id: 'tabs-custom-title',
        name: 'Custom Title',
        description: 'Custom Title Tab',
        component: CustomTitleExample,
      },
      {
        id: 'tabs-contentless-tab',
        name: 'Contentless Tab',
        description: 'Contentless Tab',
        component: ContentlessTabExample,
      },
      {
        id: 'tabs-no-tabs',
        name: 'Empty state when no tabs',
        description: 'Empty state/content for when there are no tabs',
        component: NoTabsExample,
      },
      {
        id: 'tabs-with-counter-badges',
        name: 'Tabs with counter badges',
        component: TabsWithCounterBadgesExample,
      },
      {
        id: 'tabs-styles-only',
        name: 'Tabs styles only',
        component: TabsStylesOnlyExample,
      },
      {
        id: 'justified-tabs',
        name: 'Justified tabs',
        component: JustifiedTabsExample,
      },
    ],
  },
];
