import LineBasicExample from './line.basic.example.vue';
import LineSeriesExample from './line.series.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'line-basic',
        name: 'Basic',
        description: 'Basic line chart',
        component: LineBasicExample,
      },
      {
        id: 'line-basic-plus',
        name: 'Basic plus custom series',
        description: 'Basic line chart with custom series added',
        component: LineSeriesExample,
      },
    ],
  },
];
