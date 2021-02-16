import PaginatedListBasicExample from './paginated_list.basic.example.vue';
import PaginatedListNoFilterExample from './paginated_list.no_filter.example.vue';
import PaginatedListWithEmptyListExample from './paginated_list.with_empty_list.example.vue';
import PaginatedListWithFilterFunctionExample from './paginated_list.with_filter_function.example.vue';
import PaginatedListWithHeaderSlotExample from './paginated_list.with_header_slot.example.vue';
import PaginatedListWithRowSlotExample from './paginated_list.with_row_slot.example.vue';
import PaginatedListWithSubheaderSlotExample from './paginated_list.with_subheader_slot.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'paginated-list-basic',
        name: 'Basic',
        description: 'Basic Paginated List',
        component: PaginatedListBasicExample,
      },
      {
        id: 'paginated-list-no-filter',
        name: 'No Filter',
        description: 'Paginated List with no button',
        component: PaginatedListNoFilterExample,
      },
      {
        id: 'paginated-list-with-empty-list',
        name: 'With empty list',
        description: 'Paginated List empty list',
        component: PaginatedListWithEmptyListExample,
      },
      {
        id: 'paginated-list-with-header-slot',
        name: 'With header slot',
        description: 'Paginated List header slot',
        component: PaginatedListWithHeaderSlotExample,
      },
      {
        id: 'paginated-list-with-subheader-slot',
        name: 'With subheader slot',
        description: 'Paginated List subheader slot',
        component: PaginatedListWithSubheaderSlotExample,
      },
      {
        id: 'paginated-list-with-row-slot',
        name: 'With row slot',
        description: 'Paginated List with row slot',
        component: PaginatedListWithRowSlotExample,
      },
      {
        id: 'paginated-list-with-filter-function',
        name: 'With filter function',
        description: 'Paginated List with filter function',
        component: PaginatedListWithFilterFunctionExample,
      },
    ],
  },
];
