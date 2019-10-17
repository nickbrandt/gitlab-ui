import { withKnobs } from '@storybook/addon-knobs/dist/deprecated';
import documentedStoriesOf from '../../../utils/documented_stories';
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
  }))
  .add('with href', () => ({
    props: {},
    components,
    template:
      '<ul class="list-unstyled"><gl-dropdown-item href="https://about.gitlab.com/">Some link</gl-dropdown-item></ul>',
  }));
