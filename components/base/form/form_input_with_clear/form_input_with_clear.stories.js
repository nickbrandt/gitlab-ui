import { withKnobs } from '@storybook/addon-knobs';
import documentedStoriesOf from '../../../../utils/documented_stories';
import readme from './form_input_with_clear.md';
import { GlFormInputWithClear } from '../../../../index';

const components = {
  GlFormInputWithClear,
};

documentedStoriesOf('base|form/form-input-with-clear', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components,
    template: `
      <gl-form-input-with-clear />
    `,
  }));