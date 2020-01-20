import { withKnobs } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './new_dropdown_check_item.md';
import { GlDropdownItem } from '../../../../index';

const components = {
  GlDropdownItem,
};

documentedStoriesOf('base|new_dropdown/dropdown-check-item', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: {},
    components,
    template: `<ul class="list-unstyled">
      <gl-new-dropdown-check-item :is-checked="true">Checked item</gl-new-dropdown-check-item>
      <gl-new-dropdown-check-item>Unchecked item</gl-new-dropdown-check-item>
    </ul>`,
  }));
