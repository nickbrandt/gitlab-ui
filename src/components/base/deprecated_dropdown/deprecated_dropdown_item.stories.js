import { withKnobs } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { GlDeprecatedDropdownItem } from '../../../../index';
import readme from './deprecated_dropdown_item.md';

const components = {
  GlDeprecatedDropdownItem,
};

documentedStoriesOf('base/deprecated-dropdown/deprecated-dropdown-item', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: {},
    components,
    template:
      '<ul class="list-unstyled"><gl-deprecated-dropdown-item>Some item</gl-deprecated-dropdown-item></ul>',
  }))
  .add('with href', () => ({
    props: {},
    components,
    template:
      '<ul class="list-unstyled"><gl-deprecated-dropdown-item href="https://about.gitlab.com/">Some link</gl-deprecated-dropdown-item></ul>',
  }));
