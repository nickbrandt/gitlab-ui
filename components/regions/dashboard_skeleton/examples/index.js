import DashboardSkeletonBasicExample from './dashboard_skeleton.basic.example.vue';
import DashboardSkeletonOneCardExample from './dashboard_skeleton.one_card.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'dashboard-skeleton-basic',
        name: 'Basic',
        description: 'Basic Skeleton',
        component: DashboardSkeletonBasicExample,
      },
      {
        id: 'dashboard-skeleton-single-card',
        name: 'One Card',
        description: 'Single Skeleton Card',
        component: DashboardSkeletonOneCardExample,
      },
    ],
  },
];
