import { withKnobs } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { GlDeprecatedDropdownDivider } from '../../../../index';
import readme from './deprecated_dropdown_divider.md';

const components = {
  GlDeprecatedDropdownDivider,
};

documentedStoriesOf('base/deprecated-dropdown/deprecated-dropdown-divider', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: {},
    components,
    template: '<ul class="list-unstyled"><gl-deprecated-dropdown-divider /></ul>',
  }));
