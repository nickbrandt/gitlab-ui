import { withKnobs } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './nav_item.md';
import { GlNav, GlNavItem } from '../../../../index';

const components = {
  GlNav,
  GlNavItem,
};

documentedStoriesOf('base|nav/nav-item', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components,
    template: `
      <gl-nav>
        <gl-nav-item active>Active</gl-nav-item>
        <gl-nav-item>Link</gl-nav-item>
        <gl-nav-item>Another Link</gl-nav-item>
        <gl-nav-item disabled>Disabled</gl-nav-item>
      </gl-nav>
    `,
  }));
