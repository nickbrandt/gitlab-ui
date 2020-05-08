import BasicPathExample from './path.basic.example.vue';
import PathBackgroundExample from './path.background.example.vue';
import PathWithMetricExample from './path.metric.example.vue';
import PathWithIconExample from './path.icon.example.vue';
import PathWithAllOptionsExample from './path.all.example.vue';

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
      {
        id: 'path-background',
        name: 'Path Background',
        description: 'Path Background',
        component: PathBackgroundExample,
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
      {
        id: 'path-icon',
        name: 'With Icon',
        description: 'With Icon',
        component: PathWithIconExample,
      },
      {
        id: 'path-full',
        name: 'With All Options',
        description: 'With All Options',
        component: PathWithAllOptionsExample,
      },
    ],
  },
];
