import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../../documentation/documented_stories';
import { GlFormInput } from '../../../../../index';
import { formInputSizes } from '../../../../utils/constants';
import readme from './form_input.md';

const components = {
  GlFormInput,
};

const template = `
  <gl-form-input
    type="text"
    :disabled="disabled"
    :value="value"
    :size="size"
  />`;

function generateProps({
  size = GlFormInput.props.size.default,
  value = '',
  disabled = false,
} = {}) {
  return {
    size: {
      type: String,
      default: select('size', formInputSizes, size),
    },
    value: {
      type: String,
      default: text('value', value),
    },
    disabled: {
      type: Boolean,
      default: boolean('disabled', disabled),
    },
  };
}

documentedStoriesOf('base/form/form-input', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components,
    props: generateProps(),
    template,
  }))
  .add('disabled', () => ({
    components,
    props: generateProps({ value: 'some text', disabled: true }),
    template,
  }))
  .add('sizes', () => ({
    components,
    data: () => ({
      formInputSizes,
    }),
    template: `
      <div>
        <gl-form-input
          v-for="(size, name) in formInputSizes"
          :size="size"
          :value="name"
        />
      </div>
    `,
  }));
