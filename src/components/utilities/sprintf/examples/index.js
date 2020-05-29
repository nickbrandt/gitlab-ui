import SprintfBasicExample from './sprintf.basic.example.vue';
import SprintfInterpolatedExample from './sprintf.interpolated.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'sprintf-interpolated-content',
        name: 'Interpolated content',
        description: 'Interpolated content passed to scoped slots',
        component: SprintfInterpolatedExample,
      },
      {
        id: 'sprintf-basic',
        name: 'Basic placeholders',
        description: 'Basic sprintf placeholders',
        component: SprintfBasicExample,
      },
    ],
  },
];
