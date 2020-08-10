import { withKnobs } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './dropdown_item.md';
import { GlDropdownItem } from '../../../../index';

const components = {
  GlDropdownItem,
};

documentedStoriesOf('base|dropdown/dropdown-item', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: {},
    components,
    template: '<ul class="list-unstyled"><gl-dropdown-item>Some item</gl-dropdown-item></ul>',
  }));
