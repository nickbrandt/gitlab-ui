import { withKnobs, object, text } from '@storybook/addon-knobs/vue';
import documentedStoriesOf from '../../../utils/documented_stories';
import readme from './segmented_control.md';
import { GlSegmentedControl } from '../../../../index';

const components = {
  GlSegmentedControl,
};

const defaultOptions = [
  { value: 'Pizza', text: 'Pizza' },
  { value: 'Tacos', text: 'Tacos' },
  { value: 'Burger', text: 'Burger', disabled: true },
];

function generateProps({ options = defaultOptions } = {}) {
  const props = {
    options: {
      type: Array,
      default: object('options', options),
    },
    initSelected: {
      type: String,
      default: text('selected value', 'Tacos'),
    },
  };

  return props;
}

documentedStoriesOf('base|segmented control', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    data() {
      return {
        selected: this.initSelected,
      };
    },
    watch: {
      initSelected(val) {
        this.selected = val;
      },
    },
    components,
    template: `
     <gl-segmented-control
      :options="options"
      v-model="selected"
     />
    `,
  }));
