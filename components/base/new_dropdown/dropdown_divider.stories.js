import { withKnobs } from '@storybook/addon-knobs';
import documentedStoriesOf from '../../../utils/documented_stories';
import readme from './dropdown_divider.md';
import { GlDropdownDivider } from '../../../index';

const components = {
  GlDropdownDivider,
};

documentedStoriesOf('base|new_dropdown/dropdown-divider', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: {},
    components,
    template: '<ul class="list-unstyled"><gl-dropdown-divider /></ul>',
  }));
