import HourlyExample from './heatmap.hourly.example.vue';
import TotalsExample from './heatmap.totals.example.vue';

export default [
  {
    name: 'Calendar',
    items: [
      {
        id: 'heatmap-hourly',
        name: 'Hourly breakdown',
        description: 'HourlyExample',
        component: HourlyExample,
      },
      {
        id: 'heatmap-totals',
        name: 'Histograms over time',
        description: 'TotalsExample',
        component: TotalsExample,
      },
    ],
  },
];
