import HourlyExample from './heatmap.hourly.example.vue';
import TotalsExample from './heatmap.totals.example.vue';
import CustomOptionsExample from './heatmap.custom_options.example.vue';
import CustomResponsiveExample from './heatmap.responsive.example.vue';

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
      {
        id: 'heatmap-custom-options',
        name: 'Heatmap with no background',
        description: 'CustomOptionsExample',
        component: CustomOptionsExample,
      },
      {
        id: 'heatmap-responsive',
        name: 'Heatmap which is non mobile responsive',
        description: 'CustomResponsiveExample',
        component: CustomResponsiveExample,
      },
    ],
  },
];
