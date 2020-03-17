import BarChartBasicExample from './bar.basic.example.vue';
import BarChartLongLablesExample from './bar.long_labels.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'bar-basic',
        name: 'Basic',
        description: 'Basic Bar Chart',
        component: BarChartBasicExample,
      },
      {
        id: 'bar-long-labels',
        name: 'Long labels',
        component: BarChartLongLablesExample,
      },
    ],
  },
];
