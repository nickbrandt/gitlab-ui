import BasicExample from './keyset_pagination.basic.example.vue';
import SlotsExample from './keyset_pagination.slots.example.vue';
import LinksExample from './keyset_pagination.links.example.vue';
import EventsExample from './keyset_pagination.events.example.vue';
import I18nExample from './keyset_pagination.internationalization.example.vue';

export default [
  {
    name: 'Usage examples',
    items: [
      {
        id: 'keyset-pagination-basic',
        name: 'Basic',
        description: 'Basic Cursor Pagination',
        component: BasicExample,
      },
      {
        id: 'keyset-pagination-slots',
        name: 'Custom button slots',
        description: 'Custom "Prev" or "Next" button content',
        component: SlotsExample,
      },
      {
        id: 'keyset-pagination-links',
        name: 'Link buttons',
        description: '"Prev" and "Next" buttons as link buttons',
        component: LinksExample,
      },
      {
        id: 'keyset-pagination-events',
        name: 'Button events',
        description: '"prev" and "next" events',
        component: EventsExample,
      },
      {
        id: 'keyset-pagination-i18n',
        name: 'Internationalization',
        description: 'Internationalizing the "Prev" and "Next" button text',
        component: I18nExample,
      },
    ],
  },
];
