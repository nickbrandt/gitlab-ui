import { withKnobs } from '@storybook/addon-knobs/dist/deprecated';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './deprecated_dropdown_header.md';
import { GlDeprecatedDropdownHeader } from '../../../../index';

const components = {
  GlDeprecatedDropdownHeader,
};

documentedStoriesOf('base|deprecated-dropdown/deprecated-dropdown-header', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: {},
    components,
    template:
      '<ul class="list-unstyled"><gl-deprecated-dropdown-header>Some header</gl-deprecated-dropdown-header></ul>',
  }));
