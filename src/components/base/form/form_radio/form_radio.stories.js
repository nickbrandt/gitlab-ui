import { withKnobs, boolean, object, text } from '@storybook/addon-knobs';
import documentedStoriesOf from '../../../../utils/documented_stories';
import readme from './form_radio.md';
import { GlFormRadio, GlFormRadioGroup } from '../../../../../index';

const components = {
  GlFormRadio,
  GlFormRadioGroup,
};

const defaultOptions = [
  { value: 'Pizza', text: 'Pizza' },
  { value: 'Tacos', text: 'Tacos' },
  { value: 'Burger', text: 'Burger', disabled: true },
];

function generateProps({
  stacked = false,
  groupName = 'radio-group-name',
  options = defaultOptions,
} = {}) {
  return {
    stacked: {
      type: Boolean,
      default: boolean('stacked', stacked),
    },
    name: {
      type: String,
      default: text('name', groupName),
    },
    options: {
      default: object('options', options),
    },
  };
}

documentedStoriesOf('base|form/form-radio', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components,
    props: generateProps(),
    data() {
      return {
        selected: 'Pizza',
      };
    },
    template: `
      <div>
        <gl-form-radio-group 
          id="food-radios"
          v-model="selected"
          :options="options"
          :stacked="stacked"
          :name="name"
          :checked="selected"
        >
          <template v-slot:first>
            <gl-form-radio value="Slot option">
              Slot option with help text
              <template v-slot:help>
                Help text
              </template>
            </gl-form-radio>
          </template>
          <gl-form-radio value="Last option">Last option</gl-form-radio>
        </gl-form-radio-group>
      </div>
    `,
  }));
