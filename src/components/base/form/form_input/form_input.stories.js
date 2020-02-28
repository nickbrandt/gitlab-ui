import { withKnobs } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../../documentation/documented_stories';
import readme from './form_input.md';
import { GlFormInput } from '../../../../../index';

const components = {
  GlFormInput,
};

documentedStoriesOf('base|form/form-input', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components,
    template: `
      <gl-form-input type="text" />
    `,
  }))
  .add('disabled', () => ({
    components,
    template: `
      <gl-form-input type="text" :disabled="true" value="some text" />
    `,
  }));
