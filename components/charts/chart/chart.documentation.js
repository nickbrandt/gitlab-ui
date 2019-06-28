import * as description from './chart.md';
import examples from './examples';

export default {
  description,
  examples,
  events: [
    {
      event: 'chartItemClicked',
      args: [
        {
          arg: 'chart',
          description: 'The chart instance',
        },
        {
          arg: 'params',
          description:
            'A params object, see also https://ecomfe.github.io/echarts-doc/public/en/api.html#events.Mouse%20events',
        },
      ],
      description: 'Emitted when clicked on a data item in the chart (e.g., a bar/column).',
    },
  ],
};
