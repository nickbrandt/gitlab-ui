import { withKnobs } from '@storybook/addon-knobs/vue';
import documentedStoriesOf from '../utils/documented_stories';
import readme from '../../components/base/table/table.md';
import { GlTable } from '../../index';

const components = {
  GlTable,
};

documentedStoriesOf('base|table', readme)
  .addDecorator(withKnobs)
  .add('default table', () => ({
    props: {},
    components,
    data() {
      return {
        tableItems: [
          {
            first_name: 'John',
            last_name: 'Doe',
            age: 30,
          },
        ],
      };
    },
    template: `
      <gl-table :items="tableItems">
      </gl-table>
    `,
  }));
