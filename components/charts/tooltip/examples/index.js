import ChartTooltipBasicExample from './chart_tooltip.basic.example.vue';
import ChartTooltipSelectableTextExample from './chart_tooltip.selectable_text.example.vue';

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
        name: 'Selectable text',
        description: 'Tooltip with clickable links (acts like a regular popover)',
        component: ChartTooltipSelectableTextExample,
      },
    ],
  },
];
