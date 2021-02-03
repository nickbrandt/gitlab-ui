import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { GlToggle } from '../../../../index';
import { toggleLabelPosition } from '../../../utils/constants';
import readme from './toggle.md';

const components = {
  GlToggle,
};

documentedStoriesOf('base/toggle', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components,
    props: {
      disabled: {
        default: boolean('Disabled', false),
      },
      isLoading: {
        default: boolean('Is loading', false),
      },
      help: {
        default: text('help', 'Toggle dark mode for the website'),
      },
      label: {
        default: text('label', 'Dark mode'),
      },
      labelPosition: {
        default: select('labelPosition', toggleLabelPosition, toggleLabelPosition.top),
      },
      value: {
        default: boolean('value', true),
      },
    },
    template: `
      <div class="gl-font-base">
        <gl-toggle
          v-model="value"
          :disabled="disabled"
          :help="help"
          :is-loading="isLoading"
          :label="label"
          :label-position="labelPosition"
        />
      </div>
    `,
  }));
