import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import documentedStoriesOf from '../utils/documented_stories';
import readme from '../../components/base/search_box_by_click/search_box_by_click.md';
import { GlSearchBoxByClick } from '../../index';

const components = {
  GlSearchBoxByClick,
};

function generateProps({ disabled = false, value = '', placeholder = 'Search' } = {}) {
  return {
    disabled: {
      type: Boolean,
      default: boolean('disabled', disabled),
    },
    value: {
      type: String,
      default: text('value', value),
    },
    placeholder: {
      type: String,
      default: text('placeholder', placeholder),
    },
  };
}

documentedStoriesOf('base|search-box-by-click', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    components,
    template: `
      <gl-search-box-by-click
        :value="value"
        :disabled="disabled"
        :placeholder="placeholder"
      />
    `,
  }));
