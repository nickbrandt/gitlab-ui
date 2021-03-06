import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './accordion.md';
import GlAccordion from './accordion.vue';
import GlAccordionItem from './accordion_item.vue';

const components = {
  GlAccordion,
  GlAccordionItem,
};

documentedStoriesOf('base/accordion', readme).add('default', () => ({
  components,
  template: `
    <gl-accordion :header-level="3">
      <gl-accordion-item title="Item 1">
        Each accordion can be expanded or collapsed independently of others.
      </gl-accordion-item>

      <gl-accordion-item title="Item 2">
        If you want the other accordion items to collapse when one is open, please see
        <code>Collapse Other</code> example.
      </gl-accordion-item>

      <gl-accordion-item title="Item 3">
        If you want to have an accordion item to be initially visible, please see
        <code>Initial Visible</code> example.
      </gl-accordion-item>
    </gl-accordion>
    `,
}));
