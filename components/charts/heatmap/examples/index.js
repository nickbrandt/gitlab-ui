import HourlyExample from './heatmap.hourly.example.vue';
import TotalsExample from './heatmap.totals.example.vue';

export default [
  {
    name: 'Calendar',
    items: [
      {
        id: 'heatmap-hourly',
        name: 'Basic',
        description: 'HourlyExample',
        component: HourlyExample,
      },
      {
        id: 'heatmap-totals',
        name: 'Basic',
        description: 'TotalsExample',
        component: TotalsExample,
      },
    ],
  },
];
