import { withKnobs, object, text } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../../documentation/documented_stories';
import { tokenList, labelText } from './constants';
import readme from './form_combobox.md';
import GlFormCombobox from './form_combobox.vue';

const components = {
  GlFormCombobox,
};

const getProps = () => {
  return {
    tokenList: {
      type: Array,
      default: object('tokens', tokenList),
    },
    labelText: {
      type: String,
      default: text('label text', labelText),
    },
  };
};

documentedStoriesOf('base/form/form-combobox', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components,
    props: getProps(),
    data: () => {
      return {
        value: '',
      };
    },
    template: `
      <gl-form-combobox
        v-model="value"
        :token-list="tokenList"
        :labelText="labelText"
      />
    `,
  }));
