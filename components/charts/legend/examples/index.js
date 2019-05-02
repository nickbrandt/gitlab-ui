import LegendBasicExample from './legend.basic.example.vue';
import LegendToggledExample from './legend.toggled.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'chart-legend-basic',
        name: 'Basic',
        description: 'Basic Chart Legend',
        component: LegendBasicExample,
      },
    ],
  },
  {
    name: 'Toggled',
    items: [
      {
        id: 'chart-legend-toggled',
        name: 'Toggled',
        description: 'Toggled Chart Legend',
        component: LegendToggledExample,
      },
    ],
  },
];
