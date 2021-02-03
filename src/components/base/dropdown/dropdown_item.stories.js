import { withKnobs } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { GlDropdownItem } from '../../../../index';
import readme from './dropdown_item.md';

const components = {
  GlDropdownItem,
};

documentedStoriesOf('base/dropdown/dropdown-item', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: {},
    components,
    template: '<ul class="list-unstyled"><gl-dropdown-item>Some item</gl-dropdown-item></ul>',
  }));
