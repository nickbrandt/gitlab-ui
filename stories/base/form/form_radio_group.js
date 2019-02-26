import { withKnobs, select, boolean, text } from '@storybook/addon-knobs';
import documentedStoriesOf from '../../utils/documented_stories';
import { sizeOptions, variantOptions } from '../../utils/constants';
import readme from '../../../components/base/form/form_radio/form_radio_group.md';
import { GlFormRadio, GlFormRadioGroup } from '../../../index';

const components = {
  GlFormRadio,
  GlFormRadioGroup,
};

function generateProps({
  stacked = false,
  buttons = false,
  plain = true,
  name = 'radio-group-name',
} = {}) {
  return {
    size: {
      type: String,
      default: select('size', sizeOptions, sizeOptions.sm),
    },
    stacked: {
      type: Boolean,
      default: boolean('stacked', stacked),
    },
    buttons: {
      type: Boolean,
      default: boolean('buttons', buttons),
    },
    buttonVariant: {
      type: String,
      default: select('button-variant', variantOptions, variantOptions.secondary),
    },
    plain: {
      type: Boolean,
      default: boolean('plain', plain),
    },
    name: {
      type: String,
      default: text('name', name),
    },
  };
}

documentedStoriesOf('base|form/form-radio-group', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components,
    props: generateProps(),
    data() {
      return {
        selected: 'one',
        options: [
          { value: 'one', text: 'Option 1' },
          { value: 'two', text: 'Option 2' },
          { value: 'three', text: 'Option 3', disabled: boolean('disabled', false) },
        ],
      };
    },
    template: `
      <gl-form-radio-group 
        v-model="selected"
        :options="options"
        :size="size"
        :stacked="stacked"
        :buttons="buttons"
        :button-variant="buttonVariant"
        :plain="plain"
        :name="name"
        :checked="selected"
      />
    `,
  }));
