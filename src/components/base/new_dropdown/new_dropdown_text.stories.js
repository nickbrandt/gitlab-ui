import { withKnobs } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './new_dropdown_text.md';
import { GlNewDropdownText } from '../../../../index';

const components = {
  GlNewDropdownText,
};

documentedStoriesOf('base|new_dropdown/dropdown-text', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: {},
    components,
    template:
      '<ul class="list-unstyled"><gl-new-dropdown-text>Some text</gl-new-dropdown-text></ul>',
  }));
