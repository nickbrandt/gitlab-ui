import { withKnobs } from '@storybook/addon-knobs/dist/deprecated';
import documentedStoriesOf from '../../../../documentation/documented_stories';
import readme from './sorting_item.md';
import { GlSorting, GlSortingItem } from '../../../../index';

const components = {
  GlSorting,
  GlSortingItem,
};

const onMount = component => {
  component.$nextTick(() => component.$el.querySelector('.dropdown-toggle').click());
};

documentedStoriesOf('base|sorting/sorting-item', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: {},
    components,
    template: `
      <gl-sorting text="Sorting Dropdown">
        <gl-sorting-item>Some item</gl-sorting-item>
      </gl-sorting>
    `,
    mounted() {
      onMount(this);
    },
  }))
  .add('with href', () => ({
    props: {},
    components,
    template: `
      <gl-sorting text="Sorting Dropdown">
        <gl-sorting-item href="https://about.gitlab.com/">Some link</gl-sorting-item>
      </gl-sorting>
    `,
    mounted() {
      onMount(this);
    },
  }))
  .add('with active', () => ({
    props: {},
    components,
    template: `
      <gl-sorting text="Sorting Dropdown">
        <gl-sorting-item active>Some active item</gl-sorting-item>
      </gl-sorting>
    `,
    mounted() {
      onMount(this);
    },
  }));
