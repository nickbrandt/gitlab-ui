import BasicExample from './gauge.basic.example.vue';
import NoThresholdsExample from './gauge.no_thresholds.example.vue';
import NoValueExample from './gauge.no_value.example.vue';
import WithTextExample from './gauge.with_text.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'gauge-basic',
        name: 'Basic',
        description: 'Basic Gauge',
        component: BasicExample,
      },
      {
        id: 'gauge-no-thresholds',
        name: 'No thresholds set',
        description: 'Gauge with no thresholds set',
        component: NoThresholdsExample,
      },
      {
        id: 'gauge-no-value',
        name: 'No value set',
        description: 'Gauge with no value set',
        component: NoValueExample,
      },
      {
        id: 'gauge-with-text',
        name: 'With text set',
        description: 'Gauge with custom text set',
        component: WithTextExample,
      },
    ],
  },
];
