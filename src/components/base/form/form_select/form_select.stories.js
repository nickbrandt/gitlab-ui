import { withKnobs, boolean, select, number, object } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../../documentation/documented_stories';
import { GlFormSelect } from '../../../../../index';
import { sizeOptions, formStateOptions } from '../../../../utils/constants';
import { formSelectOptions } from './constants';
import readme from './form_select.md';

const components = {
  GlFormSelect,
};

const data = () => {
  return {
    selected: 'Pizza',
  };
};

const template = `
<gl-form-select 
  v-model="selected"
  :size="size"
  :disabled="disabled"
  :state="state"
  :multiple="multiple"
  :selectSize="selectSize"
  :options="options">
</gl-form-select>
`;

function generateProps({
  size = null,
  state = null,
  disabled = false,
  multiple = false,
  selectSize = 1,
  options = formSelectOptions,
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
      type: Boolean,
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

documentedStoriesOf('base/form/form-select', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components,
    props: generateProps(),
    data,
    template,
  }))
  .add('disabled', () => ({
    components,
    props: generateProps({ disabled: true }),
    data,
    template,
  }))
  .add('valid state', () => ({
    components,
    props: generateProps({ state: true }),
    data,
    template,
  }))
  .add('invalid state', () => ({
    components,
    props: generateProps({ state: false }),
    data,
    template,
  }))
  .add('with truncation', () => ({
    components,
    props: generateProps({
      options: [
        {
          value: 1,
          text: 'A form select option with a very looooooooong label',
        },
      ],
    }),
    data() {
      return {
        selected: 1,
      };
    },
    template: `
    <div style="max-width: 300px;">
      ${template}
    </div>
    `,
  }));
