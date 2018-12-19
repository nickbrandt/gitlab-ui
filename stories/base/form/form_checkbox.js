import { withKnobs } from '@storybook/addon-knobs/vue';
import documentedStoriesOf from '../../utils/documented_stories';
import readme from '../../../components/base/form/form_checkbox/form_checkbox.md';
import { GlFormCheckbox } from '../../../index';

const components = {
  GlFormCheckbox,
};

documentedStoriesOf('base|form/form-checkbox', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components,
    template: `
      <gl-form-checkbox>Checkbox</gl-form-checkbox>
    `,
  }));
