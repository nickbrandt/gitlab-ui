import { withKnobs, boolean, select, number, object } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../../documentation/documented_stories';
import readme from './form_select.md';
import { GlFormSelect } from '../../../../../index';
import { sizeOptions, formStateOptions } from '../../../../utils/constants';

const components = {
  GlFormSelect,
};

function generateProps({
  size = null,
  state = null,
  disabled = false,
  multiple = false,
  selectSize = 1,
  options = [
    { value: 'Pizza', text: 'Pizza' },
    { value: 'Tacos', text: 'Tacos' },
    { value: 'Burger', text: 'Burguer', disabled: boolean('disabled', false) },
  ],
} = {}) {
  return {
    size: {
      type: String,
      default: select('size', sizeOptions, size),
    },
    disabled: {
      type: Boolean,
      default: boolean('disabled', disabled),
    },
    state: {
      type: String,
      default: select('state', formStateOptions, state),
    },
    multiple: {
      type: Boolean,
      default: boolean('multiple', multiple),
    },
    selectSize: {
      type: Number,
      default: number('select size', selectSize),
    },
    options: {
      type: Array,
      default: object('options', options),
    },
  };
}

documentedStoriesOf('base|form/form-select', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components,
    props: generateProps(),
    data() {
      return {
        selected: 'Pizza',
      };
    },
    methods: {
      computedState(state) {
        if(state === 'null') {
          return null;
        } else if(state === 'valid') {
          return true;
        } else if(state === 'invalid') {
          return false;
        }
      }
    },
    template: `
      <gl-form-select 
        v-model="selected"
        :size="size"
        :disabled="disabled"
        :state="computedState(state)"
        :multiple="multiple"
        :selectSize="selectSize"
        :options="options">
      </gl-form-select>
    `,
  }));
