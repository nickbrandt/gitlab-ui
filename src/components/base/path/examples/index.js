import BasicPathExample from './path.basic.example.vue';
import PathWithMetricExample from './path.metric.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'path-basic',
        name: 'Path Basic',
        description: 'Basic Path',
        component: BasicPathExample,
      },
    ],
  },
  {
    name: 'Advanced',
    items: [
      {
        id: 'path-with-metric',
        name: 'With Metric',
        description: 'With Metric',
        component: PathWithMetricExample,
      },
    ],
  },
];
