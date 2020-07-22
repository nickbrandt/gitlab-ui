import { withKnobs } from '@storybook/addon-knobs/dist/deprecated';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './deprecated_dropdown_divider.md';
import { GlDeprecatedDropdownDivider } from '../../../../index';

const components = {
  GlDeprecatedDropdownDivider,
};

documentedStoriesOf('base|deprecated-dropdown/deprecated-dropdown-divider', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: {},
    components,
    template: '<ul class="list-unstyled"><gl-deprecated-dropdown-divider /></ul>',
  }));
