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
        <gl-deprecated-button v-gl-collapse-toggle.collapse-with-heading class="float-right" variant="primary">
          Toggle Collapse
        </gl-deprecated-button>
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
        <gl-deprecated-button v-gl-collapse-toggle.collapse-template variant="primary">Toggle Collapse</gl-deprecated-button>
        <gl-collapse visible id="collapse-template" class="mt-2">
          <gl-card>Hey I was expanded all along!</gl-card>
        </gl-collapse>
      </div>
    `,
  }));
