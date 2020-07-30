import { documentedStoriesOf } from '../../../../../documentation/documented_stories';
import readme from './form_text.md';
import GlFormText from './form_text.vue';

const components = {
  GlFormText,
};

documentedStoriesOf('base|form/form-text', readme).add('default', () => ({
  components,
  template: `
      <div class="gl-form-group">
        <gl-form-text>Some form text</gl-form-text>
      </div>
    `,
}));
