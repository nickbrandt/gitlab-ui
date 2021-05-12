import { withKnobs, text, select } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../documentation/documented_stories';
import { targetOptions } from '../../utils/constants';
import { SafeLinkDirective as SafeLink } from './safe_link';
import readme from './safe_link.md';

const directives = {
  SafeLink,
};

// eslint-disable-next-line no-script-url
function generateProps({ href = 'javascript:alert(1)', target = '_blank' } = {}) {
  return {
    href: {
      type: String,
      default: text('href', href),
    },
    target: {
      type: String,
      default: select('target', targetOptions, target),
    },
  };
}

documentedStoriesOf('directives/safe-link-directive', readme)
  .addParameters({ storyshots: false })
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    directives,
    template: `
      <a
        :href="href"
        :target="target"
        v-safe-link
      >
          This is a secure link
      </a>`,
  }));
