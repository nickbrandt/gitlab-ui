import { withKnobs, select } from '@storybook/addon-knobs/dist/deprecated';
import { documentedStoriesOf } from '../../../documentation/documented_stories';
import readme from './roving_tabindex.md';
import { GlRovingTabindexDirective } from '../../../index';

documentedStoriesOf('directives|roving-tabindex', readme)
  .addParameters({ storyshots: false })
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: {},
    directives: {
      'gl-roving-tabindex': GlRovingTabindexDirective,
    },
    data() {
      return {};
    },
    template: `
      <div v-gl-roving-tabindex>
        <p><button>Foo</button></p>
        <p><button>Bar</label></p>
        <p><button>Baz</label></p>
      </div>
    `,
  }));
