import BreadcrumbSeparatorExample from './breadcrumb.separator.example.vue';
import BreadcrumbBasicExample from './breadcrumb.basic.example.vue';
import BreadcrumbBackExample from './breadcrumb.back.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'breadcrumb-basic',
        name: 'Basic',
        description: 'Basic Breadcrumbs',
        component: BreadcrumbBasicExample,
      },
    ],
  },
  {
    name: 'Separator',
    items: [
      {
        id: 'breadcrumb-separator',
        name: 'With a different separator',
        description: 'Breadcrumbs with different separator',
        component: BreadcrumbSeparatorExample,
      },
    ],
  },
  {
    name: 'Back',
    items: [
      {
        id: 'breadcrumb-back',
        name: 'With a back button',
        description: 'Breadcrumbs with a back button',
        component: BreadcrumbBackExample,
      },
    ],
  },
];
