import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './collapse.md';
import { GlCollapse } from '../../../../index';

const components = {
  GlCollapse,
};

documentedStoriesOf('base|collapse', readme)
  .add('default', () => ({
    components,
    template: `
      <div>
        <h1>Here's a headline</h1>
        <span>With some details</span>
        <gl-button v-gl-collapse-toggle.collapse-with-heading class="float-right" category="primary">
          Toggle Collapse
        </gl-button>
        <gl-collapse id="collapse-with-heading" class="gl-mt-2">
          <h1>This is collapsed by default</h1>
          <span>
            Which is good if there are some extensive details that should only be visible if the user
            wants to interact with this extra detail
          </span>
        </gl-collapse>
      </div>
    `,
  }))
  .add('initially expanded', () => ({
    components,
    template: `
      <div>
        <gl-button v-gl-collapse-toggle.collapse-template category="primary">Toggle Collapse</gl-button>
        <gl-collapse visible id="collapse-template" class="mt-2">
          <gl-card>Hey I was expanded all along!</gl-card>
        </gl-collapse>
      </div>
    `,
  }));
