import { withKnobs } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../../documentation/documented_stories';
import readme from './form_input_clear_icon.md';
import { GlFormInputClearIcon } from '../../../../../index';

const components = {
  GlFormInputClearIcon,
};

documentedStoriesOf('base|form_input_clear_icon', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components,
    template: `
      <gl-form-input-clear-icon />
    `,
  }));
