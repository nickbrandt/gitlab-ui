import { withKnobs } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './dropdown_form.md';
import { GlDropdownForm, GlButton } from '../../../../index';

const components = {
  GlDropdownForm,
  GlButton,
};

documentedStoriesOf('base|dropdown/dropdown-form', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components,
    template:
      '<ul class="list-unstyled"><gl-dropdown-form><gl-button>One</gl-button></gl-dropdown-form></ul>',
  }));
