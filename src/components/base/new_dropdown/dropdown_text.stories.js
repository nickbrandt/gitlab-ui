import { withKnobs } from '@storybook/addon-knobs';
import documentedStoriesOf from '../../../../documentation/documented_stories';
import readme from './dropdown_text.md';
import { GlNewDropdownText } from '../../../../index';

const components = {
  GlNewDropdownText,
};

documentedStoriesOf('base|new_dropdown/dropdown-text', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: {},
    components,
    template: '<gl-new-dropdown-text>Some header</gl-new-dropdown-text>',
  }));
