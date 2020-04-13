import { withKnobs } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './nav_item_dropdown.md';
import { GlNav, GlNavItemDropdown } from '../../../../index';

const components = {
  GlNav,
  GlNavItemDropdown,
};

documentedStoriesOf('base|nav/nav-item-dropdown', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components,
    template: `
      <gl-nav>
        <gl-nav-item-dropdown text="Dropdown">
          <gl-new-dropdown-item>One</gl-new-dropdown-item>
          <gl-new-dropdown-item>Two</gl-new-dropdown-item>
          <gl-new-dropdown-item>Three</gl-new-dropdown-item>
        </gl-nav-item-dropdown>
      </gl-nav>
    `,
  }))
  .add('with divider', () => ({
    components,
    template: `
      <gl-nav>
        <gl-nav-item-dropdown text="Dropdown">
          <gl-new-dropdown-item>Above divider</gl-new-dropdown-item>
          <gl-new-dropdown-divider />
          <gl-new-dropdown-item>Below divider</gl-new-dropdown-item>
        </gl-nav-item-dropdown>
      </gl-nav>
    `,
  }))
  .add('custom button', () => ({
    components,
    template: `
      <gl-nav>
        <gl-nav-item-dropdown text="Dropdown">
          <template #button-content>
            <gl-icon name="question" />
            <gl-icon name="angle-down" />
          </template>
          <gl-new-dropdown-item>One</gl-new-dropdown-item>
          <gl-new-dropdown-item>Two</gl-new-dropdown-item>
        </gl-nav-item-dropdown>
      </gl-nav>
    `,
  }));
