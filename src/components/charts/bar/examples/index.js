import BarChartBasicExample from './bar.basic.example.vue';
import BarChartLongLablesExample from './bar.long_labels.example.vue';
import BarChartMultipleSeriesExample from './bar.multiple_series.example.vue';
import BarChartNegativeValuesExample from './bar.negative_values.example.vue';

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
        id: 'bar-negative-labels',
        name: 'Negative values',
        component: BarChartNegativeValuesExample,
      },
      {
        id: 'bar-long-labels',
        name: 'Long labels with negative values',
        component: BarChartLongLablesExample,
      },
      {
        id: 'bar-multiple-series',
        name: 'Multiple Series Bar Chart',
        component: BarChartMultipleSeriesExample,
      },
    ],
  },
];
