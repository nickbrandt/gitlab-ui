import LastAppearedExample from './intersection_observer.last_appeared.example.vue';
import ImageExample from './intersection_observer.image.example.vue';

export default [
  {
    name: 'Intersection observer',
    items: [
      {
        id: 'intersection-observer-last-appeared',
        name: 'Last appeared at',
        description: 'Logs when the component last appeared on the screen',
        component: LastAppearedExample,
      },
      {
        id: 'intersection-observer-lazy-loaded-image',
        name: 'Lazy loaded image',
        description:
          "This image switches between a gif and a still image when it's on or off the screen",
        component: ImageExample,
      },
    ],
  },
];
