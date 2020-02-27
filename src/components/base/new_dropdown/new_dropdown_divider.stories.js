import { withKnobs } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './new_dropdown_divider.md';
import { GlNewDropdownDivider } from '../../../../index';

const components = {
  GlNewDropdownDivider,
};

documentedStoriesOf('base|new_dropdown/dropdown-divider', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: {},
    components,
    template: '<ul class="list-unstyled"><gl-new-dropdown-divider /></ul>',
  }));
