import { withKnobs } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { GlDeprecatedDropdownHeader } from '../../../../index';
import readme from './deprecated_dropdown_header.md';

const components = {
  GlDeprecatedDropdownHeader,
};

documentedStoriesOf('base/deprecated-dropdown/deprecated-dropdown-header', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: {},
    components,
    template:
      '<ul class="list-unstyled"><gl-deprecated-dropdown-header>Some header</gl-deprecated-dropdown-header></ul>',
  }));
