import { withKnobs, object } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../../documentation/documented_stories';
import { GlFormCheckbox, GlFormCheckboxGroup } from '../../../../../index';
import readme from './form_checkbox.md';

const components = {
  GlFormCheckbox,
  GlFormCheckboxGroup,
};

const groupComponent = () => ({
  components,
  props: {
    // Note: options allows an html property, but withKnobs escapes html characters so it won't work
    // More info here: https://github.com/storybookjs/storybook/tree/v4.0.0-alpha.8/addons/knobs#withknobs-vs-withknobsoptions
    options: {
      default: object('Options', [
        'String option',
        { text: 'Disabled object option', value: 'disabled value', disabled: true },
        {
          text: 'Enabled object option',
          value: 'html value',
        },
      ]),
    },
  },
  template: `
      <gl-form-checkbox-group :options="options">
        <template #first>
          <gl-form-checkbox value="Slot option">
            Slot option with help text
            <template #help>
              Help text
            </template>
          </gl-form-checkbox>
        </template>
        <gl-form-checkbox value="Last option">Last option</gl-form-checkbox>
      </gl-form-checkbox-group>
    `,
});

documentedStoriesOf('base/form/form-checkbox', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components,
    template: `
      <gl-form-checkbox>Checkbox</gl-form-checkbox>
    `,
  }))
  .add('group', () => groupComponent());
