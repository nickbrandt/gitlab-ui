import { withKnobs, text as textKnob, boolean } from '@storybook/addon-knobs/dist/deprecated';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './sorting.md';
import { GlSorting, GlSortingItem } from '../../../../index';

const components = {
  GlSorting,
  GlSortingItem,
};

const generateProps = ({
  text = 'Sorting Dropdown',
  isAscending = GlSorting.props.isAscending.default,
  sortDirectionToolTip = GlSorting.props.sortDirectionToolTip.default,
  dropdownClass = GlSorting.props.dropdownClass.default,
  dropdownToggleClass = GlSorting.props.dropdownToggleClass.default,
  sortDirectionToggleClass = GlSorting.props.sortDirectionToggleClass.default,
} = {}) => ({
  text: {
    type: String,
    default: textKnob('text', text),
  },
  isAscending: {
    type: Boolean,
    default: boolean('is-ascending', isAscending),
  },
  sortDirectionToolTip: {
    type: String,
    default: textKnob('sort-direction-tool-tip', sortDirectionToolTip),
  },
  dropdownClass: {
    type: String,
    default: textKnob('dropdown-class', dropdownClass),
  },
  dropdownToggleClass: {
    type: String,
    default: textKnob('dropdown-toggle-class', dropdownToggleClass),
  },
  sortDirectionToggleClass: {
    type: String,
    default: textKnob('sort-direction-toggle-class', sortDirectionToggleClass),
  },
});

documentedStoriesOf('base|sorting', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    components,
    template: `
      <gl-sorting
        :text="text"
        :is-ascending="isAscending"
        :sort-direction-tool-tip="sortDirectionToolTip"
        :dropdown-class="dropdownClass"
        :dropdown-toggle-class="dropdownToggleClass"
        :sort-direction-toggle-class="sortDirectionToggleClass"
        style="margin-left: 50px;"
      >
        <gl-sorting-item active>First item</gl-sorting-item>
        <gl-sorting-item>Second item</gl-sorting-item>
        <gl-sorting-item>Last item</gl-sorting-item>
      </gl-sorting>`,
    mounted() {
      this.$nextTick(() => this.$el.querySelector('.dropdown-toggle').click());
    },
  }));
