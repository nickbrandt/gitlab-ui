import PaginationBasicExample from './pagination.basic.example.vue';
import PaginationCompactExample from './pagination.compact.example.vue';
import PaginationDoubleTruncation from './pagination.double_truncation.example.vue';
import PaginationEventExample from './pagination.event.example.vue';
import PaginationLinksExample from './pagination.links.example.vue';

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
        id: 'pagination-double-truncation',
        name: 'Double truncation',
        description: 'Double truncation',
        component: PaginationDoubleTruncation,
      },
      {
        id: 'pagination-compact',
        name: 'Compact',
        description: 'Compact Pagination',
        component: PaginationCompactExample,
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
