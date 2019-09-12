import SparklineBasicExample from './sparkline.basic.example.vue';
import SparklineNoLastYValueExample from './sparkline.no_last_y_value.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'sparkline-basic',
        name: 'Basic',
        description: 'Basic sparkline chart',
        component: SparklineBasicExample,
      },
      {
        id: 'sparkline-not-showing-last-y-value',
        name: `Not showing the last entry's y-value`,
        description: `Basic sparkline chart not showing the last entry's y-value`,
        component: SparklineNoLastYValueExample,
      },
    ],
  },
];
