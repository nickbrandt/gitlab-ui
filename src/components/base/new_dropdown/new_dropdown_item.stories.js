import { withKnobs } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './new_dropdown_item.md';
import { GlDropdownItem } from '../../../../index';

const components = {
  GlDropdownItem,
};

documentedStoriesOf('base|new_dropdown/dropdown-item', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: {},
    components,
    template:
      '<ul class="list-unstyled"><gl-new-dropdown-item>Some item</gl-new-dropdown-item></ul>',
  }))
  .add('with href', () => ({
    props: {},
    components,
    template:
      '<ul class="list-unstyled"><gl-new-dropdown-item href="https://about.gitlab.com/">Some link</gl-new-dropdown-item></ul>',
  }));
