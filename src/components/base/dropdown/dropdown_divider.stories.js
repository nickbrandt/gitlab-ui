import { withKnobs } from '@storybook/addon-knobs/dist/deprecated';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './dropdown_divider.md';
import { GlDropdownDivider } from '../../../../index';

const components = {
  GlDropdownDivider,
};

documentedStoriesOf('base|dropdown/dropdown-divider', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: {},
    components,
    template: '<ul class="list-unstyled"><gl-dropdown-divider /></ul>',
  }));
