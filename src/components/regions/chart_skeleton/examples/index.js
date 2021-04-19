import ChartSkeletonBasicExample from './chart_skeleton.basic.example.vue';
import ChartSkeletonCustomSizesExample from './chart_skeleton.custom_sizes.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'chart-skeleton-basic',
        name: 'Basic',
        description: 'Basic Skeleton',
        component: ChartSkeletonBasicExample,
      },
      {
        id: 'chart-skeleton-custom-sizes',
        name: 'Custom Sizes',
        description: 'Skeleton with custom sizes',
        component: ChartSkeletonCustomSizesExample,
      },
    ],
  },
];
