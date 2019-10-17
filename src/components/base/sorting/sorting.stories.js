import { withKnobs } from '@storybook/addon-knobs/dist/deprecated';
import documentedStoriesOf from '../../../utils/documented_stories';
import readme from './sorting.md';
import { GlSorting, GlSortingItem } from '../../../../index';

const components = {
  GlSorting,
  GlSortingItem,
};

documentedStoriesOf('base|sorting', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: {},
    components,
    template: `
      <gl-sorting text="Sorting Dropdown" style="margin-left: 50px;">
        <gl-sorting-item active>First item</gl-sorting-item>
        <gl-sorting-item>Second item</gl-sorting-item>
        <gl-sorting-item>Last item</gl-sorting-item>
      </gl-sorting>`,
    mounted() {
      this.$nextTick(() => this.$el.querySelector('.dropdown-toggle').click());
    },
  }));
