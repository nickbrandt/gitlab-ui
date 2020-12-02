import PopoverBasicExample from './popover.basic.example.vue';
import PopoverLoadingExample from './popover.loading.example.vue';
import PopoverNoTitleExample from './popover.notitle.example.vue';

export default [
  {
    name: 'Examples',
    items: [
      {
        id: 'popover-basic',
        name: 'Basic',
        description: 'Basic Popover',
        component: PopoverBasicExample,
      },
      {
        id: 'popover-loading',
        name: 'Loading',
        description: 'Popover with Skeleton Loading',
        component: PopoverLoadingExample,
      },
      {
        id: 'popover-no-title',
        name: 'No title',
        description: 'Popover with no title',
        component: PopoverNoTitleExample,
      },
    ],
  },
];
