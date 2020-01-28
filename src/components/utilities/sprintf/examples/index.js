import SprintfBasicExample from './sprintf.basic.example.vue';
import SprintfInterpolatedExample from './sprintf.interpolated.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'sprintf-basic',
        name: 'Basic',
        description: 'Basic sprintf',
        component: SprintfBasicExample,
      },
      {
        id: 'sprintf-interpolated-content',
        name: 'Interpolated content',
        description: 'Interpolated content passed to scoped slots',
        component: SprintfInterpolatedExample,
      },
    ],
  },
];
