import ColumnChartBasicExample from './column.basic.example.vue';
import ColumnChartCustomTooltipExample from './column.custom_tooltip.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'column-basic',
        name: 'Basic',
        description: 'Basic Column Chart',
        component: ColumnChartBasicExample,
      },
    ],
  },
  {
    name: 'Custom Tooltip',
    items: [
      {
        id: 'column-custom-tooltip',
        name: 'Custom Tooltip',
        description: 'Custom Tooltip Column Chart',
        component: ColumnChartCustomTooltipExample,
      },
    ],
  },
];
