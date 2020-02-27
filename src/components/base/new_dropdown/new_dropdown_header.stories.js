import { withKnobs } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './new_dropdown_header.md';
import { GlNewDropdownHeader } from '../../../../index';

const components = {
  GlNewDropdownHeader,
};

documentedStoriesOf('base|new_dropdown/dropdown-header', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: {},
    components,
    template:
      '<ul class="list-unstyled"><gl-new-dropdown-header>Some header</gl-new-dropdown-header></ul>',
  }));
