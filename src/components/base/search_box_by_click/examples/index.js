import SearchBoxByClickDefaultExample from './search_box_by_click.default.example.vue';
import SearchBoxByClickHistoryExample from './search_box_by_click.history.example.vue';
import SearchBoxByClickVModelExample from './search_box_by_click.v_model.example.vue';

export default [
  {
    name: 'Search Box By Click',
    items: [
      {
        id: 'search-box-by-click',
        name: 'default',
        component: SearchBoxByClickDefaultExample,
      },
      {
        id: 'search-box-by-click-v-model',
        name: 'Using v-model',
        component: SearchBoxByClickVModelExample,
      },
      {
        id: 'search-box-by-click-with-history',
        name: 'with history',
        component: SearchBoxByClickHistoryExample,
      },
    ],
  },
];
