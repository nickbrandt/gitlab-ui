import SingleStatSimpleExample from './single_stat.simple.example.vue';
import SingleStatIconExample from './single_stat.icon.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'simple',
        name: 'Simple',
        component: SingleStatSimpleExample,
      },
      {
        id: 'icon',
        name: 'Icon',
        component: SingleStatIconExample,
      },
    ],
  },
];
