import { withKnobs, text } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../../documentation/documented_stories';
import readme from './form_radio.md';
import { GlFormRadio } from '../../../../../index';

const components = {
  GlFormRadio,
};

const defaultOptions = [
  { value: 'Pizza', text: 'Pizza' },
  { value: 'Tacos', text: 'Tacos' },
  { value: 'Burger', text: 'Burger', disabled: true },
];

function generateProps({ name = 'radio-group-name' } = {}) {
  return {
    name: {
      type: String,
      default: text('name', name),
    },
  };
}

documentedStoriesOf('base/form/form-radio', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components,
    props: generateProps(),
    data() {
      return {
        selected: defaultOptions[0].value,
        options: defaultOptions,
      };
    },
    template: `
      <div>
        <gl-form-radio
          v-for="option in options"
          :key="option.value"
          v-model="selected"
          :value="option.value"
          :disabled="option.disabled"
          :name="name"
        >{{ option.text }}</gl-form-radio>
      </div>
    `,
  }));
