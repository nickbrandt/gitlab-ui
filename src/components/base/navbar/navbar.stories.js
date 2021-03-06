import { withKnobs } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { GlNavbar } from '../../../../index';
import readme from './navbar.md';

const components = {
  GlNavbar,
};

documentedStoriesOf('base/navbar', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components,
    template: `
    <gl-navbar variant="dark" type="dark">
      <b-navbar-brand tag="h1" class="mb-0">Gitlab</b-navbar-brand>
    </gl-navbar>
    `,
  }));
