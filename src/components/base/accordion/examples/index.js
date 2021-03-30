import AccordionAutoCollapseExample from './accordion.auto_collapse.example.vue';
import AccordionBasicExample from './accordion.basic.example.vue';
import AccordionInitialVisibleExample from './accordion.initial_visible.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'accordion-basic',
        name: 'Basic',
        description: 'Basic Accordion',
        component: AccordionBasicExample,
      },
      {
        id: 'accordion-initial-visible',
        name: 'Initial Visible',
        description: 'Initial visibility (start expanded)',
        component: AccordionInitialVisibleExample,
      },
      {
        id: 'accordion-auto-collapse',
        name: 'Auto Collapse',
        description: 'Auto collapse in an accordion group',
        component: AccordionAutoCollapseExample,
      },
    ],
  },
];
