import ChartTooltipBasicExample from './chart_tooltip.basic.example.vue';
import ChartTooltipPointerEventsExample from './chart_tooltip.pointer_events.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'chart-tooltip-basic',
        name: 'Basic',
        description: 'Basic Tooltip',
        component: ChartTooltipBasicExample,
      },
      {
        id: 'chart-tooltip-clickable',
        name: 'Enable pointer events',
        description: 'Tooltip with clickable links (acts like a regular popover)',
        component: ChartTooltipPointerEventsExample,
      },
    ],
  },
];
