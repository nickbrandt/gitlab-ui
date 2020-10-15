import description from './chart.md';

export default {
  description,

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
            'A params object, see also https://echarts.apache.org/en/api.html#events.Mouse%20events',
        },
      ],
      description: 'Emitted when clicked on a data item in the chart (e.g., a bar/column).',
    },
  ],
};
