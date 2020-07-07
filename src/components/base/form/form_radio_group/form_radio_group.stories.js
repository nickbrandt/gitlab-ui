import { withKnobs, object, text } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../../documentation/documented_stories';
import readme from './form_radio_group.md';
import { GlFormRadioGroup } from '../../../../../index';

const components = {
  GlFormRadioGroup,
};

const defaultOptions = [
  { value: 'Pizza', text: 'Pizza' },
  { value: 'Tacos', text: 'Tacos' },
  { value: 'Burger', text: 'Burger', disabled: true },
];

function generateProps({ name = 'radio-group-name', options = defaultOptions } = {}) {
  return {
    name: {
      type: String,
      default: text('name', name),
    },
    options: {
      default: object('options', options),
    },
  };
}

const template = `
  <div>
    <gl-form-radio-group
      v-model="selected"
      :options="options"
      :name="name"
    >
      <template #first>
        <gl-form-radio value="Slot option">
          Slot option with help text
          <template #help>
            Help text
          </template>
        </gl-form-radio>
      </template>
      <gl-form-radio value="Last option">Last option</gl-form-radio>
    </gl-form-radio-group>
  </div>`;

const data = () => ({ selected: 'Slot option' });

documentedStoriesOf('base|form/form-radio-group', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components,
    props: generateProps(),
    data,
    template,
  }));
