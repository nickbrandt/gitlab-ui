import SearchBoxByTypeDefaultExample from './search_box_by_type.default.example.vue';
import SearchBoxByTypeLoadingExample from './search_box_by_type.loading.example.vue';

export default [
  {
    name: 'Search Box By Type',
    items: [
      {
        id: 'search-box-by-type',
        name: 'default',
        component: SearchBoxByTypeDefaultExample,
      },
      {
        id: 'search-box-by-type-loading',
        name: 'loading',
        component: SearchBoxByTypeLoadingExample,
      },
    ],
  },
];
