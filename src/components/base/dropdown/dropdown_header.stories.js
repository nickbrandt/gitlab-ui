import { withKnobs } from '@storybook/addon-knobs/dist/deprecated';
import documentedStoriesOf from '../../../../documentation/documented_stories';
import readme from './dropdown_header.md';
import { GlDropdownHeader } from '../../../../index';

const components = {
  GlDropdownHeader,
};

documentedStoriesOf('base|dropdown/dropdown-header', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: {},
    components,
    template: '<ul class="list-unstyled"><gl-dropdown-header>Some header</gl-dropdown-header></ul>',
  }));
