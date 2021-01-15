import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './accordion_item.md';
import GlAccordionItem from './accordion_item.vue';

const components = {
  GlAccordionItem,
};

documentedStoriesOf('base/accordion/accordion-item', readme).add('default', () => ({
  components,
  template: `
      <gl-accordion-item title="Item 1" visible>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, maiores.
      </gl-accordion-item>
    `,
}));
