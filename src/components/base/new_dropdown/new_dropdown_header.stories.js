import { withKnobs } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './new_dropdown_header.md';
import { GlDropdownHeader } from '../../../../index';

const components = {
  GlDropdownHeader,
};

documentedStoriesOf('base|new_dropdown/dropdown-header', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: {},
    components,
    template:
      '<ul class="list-unstyled"><gl-new-dropdown-header>Some header</gl-new-dropdown-header></ul>',
  }));
