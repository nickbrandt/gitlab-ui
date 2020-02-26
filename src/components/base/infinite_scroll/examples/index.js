import InfiniteScrollBasicExample from './infinite_scroll.basic.example.vue';
import InfiniteScrollWithFiniteTotalItemsExample from './infinite_scroll.finite_total_items.example.vue';
import InfiniteScrollWithSmallNumberOfFetchedItemsExample from './infinite_scroll.small_fetched_items.example.vue';
import InfiniteScrollWithLargeNumberOfFetchedItemsExample from './infinite_scroll.large_fetched_items.example.vue';
import InfiniteScrollAllItemsExample from './infinite_scroll.all_items.example.vue';
import InfiniteScrollReverseExample from './infinite_scroll.reverse.example.vue';
import InfiniteScrollTwoWayExample from './infinite_scroll.two_way.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'infinite-scroll-basic',
        name: 'Basic',
        description: 'Basic Infinite Scroll',
        component: InfiniteScrollBasicExample,
      },
      {
        id: 'infinite-scroll-with-finite-total-items',
        name: 'Fixed items',
        description: 'With finite total items',
        component: InfiniteScrollWithFiniteTotalItemsExample,
      },
      {
        id: 'infinite-scroll-small-fetched-items',
        name: 'With a small number of fetched items',
        description: 'Infinite Scroll with small number of fetched items',
        component: InfiniteScrollWithSmallNumberOfFetchedItemsExample,
      },
      {
        id: 'infinite-scroll-large-fetched-items',
        name: 'With a large number of fetched items',
        description: 'Infinite Scroll with large number of fetched items',
        component: InfiniteScrollWithLargeNumberOfFetchedItemsExample,
      },
      {
        id: 'infinite-scroll-all-items',
        name: 'Showing all items',
        description: 'Infinite Scroll with all items',
        component: InfiniteScrollAllItemsExample,
      },
      {
        id: 'infinite-scroll-reverse',
        name: 'Reversed',
        description: 'Infinite Scroll with items added at the top',
        component: InfiniteScrollReverseExample,
      },
      {
        id: 'infinite-scroll-two-way',
        name: 'Two way Infinite Scroll',
        description: 'Infinite Scroll with items added in two directions',
        component: InfiniteScrollTwoWayExample,
      },
    ],
  },
];
