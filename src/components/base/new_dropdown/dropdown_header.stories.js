import { withKnobs } from '@storybook/addon-knobs';
import documentedStoriesOf from '../../../utils/documented_stories';
import readme from './dropdown_header.md';
import { GlDropdownHeader } from '../../../../index';

const components = {
  GlDropdownHeader,
};

documentedStoriesOf('base|new_dropdown/dropdown-header', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: {},
    components,
    template: '<ul class="list-unstyled"><gl-dropdown-header>Some header</gl-dropdown-header></ul>',
  }));
