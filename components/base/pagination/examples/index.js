import PaginationBasicExample from './pagination.basic.example.vue';
import PaginationSlotsExample from './pagination.slots.example.vue';
import PaginationLinksExample from './pagination.links.example.vue';
import PaginationEventExample from './pagination.event.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'pagination-basic',
        name: 'Basic',
        description: 'Basic Pagination',
        component: PaginationBasicExample,
      },
      {
        id: 'pagination-slots',
        name: 'Custom slots rendering',
        description: 'Custom slots rendering',
        component: PaginationSlotsExample,
      },
      {
        id: 'pagination-links',
        name: 'Link based pagination',
        description: 'Link based pagination',
        component: PaginationLinksExample,
      },
      {
        id: 'pagination-event',
        name: 'Page change event',
        description: 'Page change event',
        component: PaginationEventExample,
      },
    ],
  },
];
