import { withKnobs } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './navbar.md';
import { GlNavbar } from '../../../../index';

const components = {
  GlNavbar,
};

documentedStoriesOf('base|navbar', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components,
    template: `
    <gl-navbar variant="dark" type="dark">
      <b-navbar-brand tag="h1" class="mb-0">Gitlab</b-navbar-brand>
    </gl-navbar>
    `,
  }));
