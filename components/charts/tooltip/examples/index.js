import ChartTooltipBasicExample from './chart_tooltip.basic.example.vue';
import ChartTooltipFromDataExample from './chart_tooltip.from_data.example.vue';
import ChartTooltipLongLabelExample from './chart_tooltip.long_label.example.vue';

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
    ],
  },
  {
    name: 'From Data',
    items: [
      {
        id: 'chart-tooltip-from-data',
        name: 'From Data',
        description: 'From Data Tooltip',
        component: ChartTooltipFromDataExample,
      },
    ],
  },
  {
    name: 'Long Series Label',
    items: [
      {
        id: 'chart-tooltip-long-label',
        name: 'Long Series Label',
        description: 'Tooltip From Data with long label',
        component: ChartTooltipLongLabelExample,
      },
    ],
  },
];
