import { withKnobs } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './dropdown_item.md';
import { GlDropdownItem } from '../../../../index';

const components = {
  GlDropdownItem,
};

documentedStoriesOf('base/dropdown/dropdown-item', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: {},
    components,
    template: '<ul class="list-unstyled"><gl-dropdown-item>Some item</gl-dropdown-item></ul>',
  }))
  .add('checked', () => ({
    props: {},
    components,
    template:
      '<ul class="list-unstyled"><gl-dropdown-item :is-checked="true" :is-check-item="true">Some item</gl-dropdown-item></ul>',
  }))
  .add('checked with avatar', () => ({
    props: {},
    components,
    template: `<ul class="list-unstyled">
      <gl-dropdown-item
        :is-checked="true"
        :is-check-item="true"
        :is-check-centered="true"
        avatar-url="https://secure.gravatar.com/avatar/78b060780d36f51a6763ac9831a4f022?s=180&d=identicon"
        secondary-text="@sytses"
      >
        Sid Sijbrandij
      </gl-dropdown-item></ul>`,
  }))
  .add('checked with secondary text', () => ({
    props: {},
    components,
    template:
      '<ul class="list-unstyled"><gl-dropdown-item :is-checked="true" :is-check-item="true" secondary-text="Lorem ipsum dolar sit amit...">Some item</gl-dropdown-item></ul>',
  }));
