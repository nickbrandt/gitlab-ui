import FilteredSearchDefaultExample from './filtered_search.default.example.vue';
import FilteredSearchFriendlyExample from './filtered_search.friendly.example.vue';
import FilteredSearchHistoryExample from './filtered_search.history.example.vue';
import FilteredSearchMultiSelectExample from './filtered_search.multi_select.example.vue';
import FilteredSearchSingleUniqueExample from './filtered_search.single_unique.example.vue';

export default [
  {
    name: 'Filtered search',
    items: [
      {
        id: 'filtered-search',
        name: 'default',
        component: FilteredSearchDefaultExample,
      },
      {
        id: 'filtered-search-single-unique',
        name: 'single-unique',
        component: FilteredSearchSingleUniqueExample,
      },
      {
        id: 'filtered-search-history',
        name: 'with-history',
        component: FilteredSearchHistoryExample,
      },
      {
        id: 'filtered-search-friendly-text',
        name: 'with-friendly-text',
        component: FilteredSearchFriendlyExample,
      },
      {
        id: 'filtered-search-multi-select',
        name: 'with-multi-select',
        component: FilteredSearchMultiSelectExample,
      },
    ],
  },
];
