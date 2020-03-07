import FilteredSearchDefaultExample from './filtered_search.default.example.vue';
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
    ],
  },
];
