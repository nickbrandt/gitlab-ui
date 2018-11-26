import SkeletonLoadingBasicExample from './skeleton_loading.basic.example.vue';
import SkeletonLoadingOneLineExample from './skeleton_loading.one_line.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'skeleton-loading-basic',
        name: 'Basic',
        description: 'Basic Skeleton Loader',
        component: SkeletonLoadingBasicExample,
      },
      {
        id: 'skeleton-loading-one-line',
        name: 'One Line',
        description: 'Skeleton Loader with one line',
        component: SkeletonLoadingOneLineExample,
      },
    ],
  },
];
