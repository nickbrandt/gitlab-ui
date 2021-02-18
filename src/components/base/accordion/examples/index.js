import AccordionBasicExample from './accordion.basic.example.vue';
import AccordionCollapseOtherExample from './accordion.collapse_other.example.vue';
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
        id: 'accordion-collapse-other',
        name: 'Collapse Other',
        description: 'Collapse Other in an accordion group',
        component: AccordionCollapseOtherExample,
      },
    ],
  },
];
