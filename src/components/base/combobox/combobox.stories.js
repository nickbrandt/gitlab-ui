import { uniqueId } from 'lodash';
import { withKnobs, object, text } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './combobox.md';
import GlCombobox from './combobox.vue';
import { tokenList, labelText } from './constants';

const components = {
  GlCombobox,
};

const getProps = () => {

  return {
    tokenList: {
      type: Array,
      default: object('tokens', tokenList)
    },
    labelText: {
      type: String,
      default: text('label text', labelText)
    },
  }
};


documentedStoriesOf('base|combobox', readme)
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
      <gl-combobox
        v-model="value"
        :token-list="tokenList"
        :labelText="labelText"
      />
    `,
  }));
