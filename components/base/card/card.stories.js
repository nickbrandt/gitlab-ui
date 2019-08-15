import documentedStoriesOf from '../../../utils/documented_stories';
import readme from './card.md';
import PurchasePlanTemplate from './examples/card.purchase.plans.example.vue'

import { GlCard } from '../../../index';


const components = {
  GlCard,
};

documentedStoriesOf('base|card', readme)
  .add('default', () => ({
    props: {},
    components,
    template: '<div><gl-card /></div>',
  }))
  .add('Purchase Plan', () => ({
    props: {},
    components,
    template: PurchasePlanTemplate,
  }));
