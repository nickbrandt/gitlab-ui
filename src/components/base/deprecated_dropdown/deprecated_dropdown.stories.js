import { withKnobs } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './deprecated_dropdown.md';
import {
  GlDeprecatedDropdown,
  GlDeprecatedDropdownDivider,
  GlDeprecatedDropdownHeader,
  GlDeprecatedDropdownItem,
} from '../../../../index';

const components = {
  GlDeprecatedDropdown,
  GlDeprecatedDropdownDivider,
  GlDeprecatedDropdownHeader,
  GlDeprecatedDropdownItem,
};

documentedStoriesOf('base/deprecated-dropdown', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: {},
    components,
    template: `
      <gl-deprecated-dropdown text="Some dropdown">
        <gl-deprecated-dropdown-item>First item</gl-deprecated-dropdown-item>
        <gl-deprecated-dropdown-item>Second item</gl-deprecated-dropdown-item>
        <gl-deprecated-dropdown-item>Last item</gl-deprecated-dropdown-item>
      </gl-deprecated-dropdown>`,
    mounted() {
      this.$nextTick(() => this.$el.querySelector('.dropdown-toggle').click());
    },
  }))
  .add('with short text and wide width', () => ({
    components,
    template: `
      <gl-deprecated-dropdown :style="{ width: '400px' }" text="Some dropdown">
        <gl-deprecated-dropdown-item>First item</gl-deprecated-dropdown-item>
      </gl-deprecated-dropdown>`,
  }))
  .add('with long text and narrow width', () => ({
    components,
    template: `
      <gl-deprecated-dropdown :style="{ maxWidth: '160px' }" toggle-class="gl-w-full" text="This is a dropdown with a long toggle text">
        <gl-deprecated-dropdown-item>First item</gl-deprecated-dropdown-item>
      </gl-deprecated-dropdown>`,
  }))
  .add('with empty text', () => ({
    components,
    template: `
      <gl-deprecated-dropdown :style="{ width: '400px' }" toggle-class="gl-w-full">
        <gl-deprecated-dropdown-item>First item</gl-deprecated-dropdown-item>
      </gl-deprecated-dropdown>`,
  }))
  .add('with links', () => ({
    props: {},
    components,
    template: `
      <gl-deprecated-dropdown text="Some dropdown">
        <gl-deprecated-dropdown-item href="https://about.gitlab.com/">First link</gl-deprecated-dropdown-item>
        <gl-deprecated-dropdown-item href="https://about.gitlab.com/">Second link</gl-deprecated-dropdown-item>
        <gl-deprecated-dropdown-item href="https://about.gitlab.com/">Last link</gl-deprecated-dropdown-item>
      </gl-deprecated-dropdown>`,
    mounted() {
      this.$nextTick(() => this.$el.querySelector('.dropdown-toggle').click());
    },
  }))
  .add('with divider', () => ({
    props: {},
    components,
    template: `
      <gl-deprecated-dropdown text="Some dropdown">
        <gl-deprecated-dropdown-item>Above divider</gl-deprecated-dropdown-item>
        <gl-deprecated-dropdown-divider />
        <gl-deprecated-dropdown-item>Below divider</gl-deprecated-dropdown-item>
      </gl-deprecated-dropdown>`,
    mounted() {
      this.$nextTick(() => this.$el.querySelector('.dropdown-toggle').click());
    },
  }))
  .add('with header', () => ({
    props: {},
    components,
    template: `
      <gl-deprecated-dropdown text="Some dropdown">
        <gl-deprecated-dropdown-header>First group</gl-deprecated-dropdown-header>
        <gl-deprecated-dropdown-item>First item</gl-deprecated-dropdown-item>
        <gl-deprecated-dropdown-item>Second item</gl-deprecated-dropdown-item>
        <gl-deprecated-dropdown-divider />
        <gl-deprecated-dropdown-header>Second group</gl-deprecated-dropdown-header>
        <gl-deprecated-dropdown-item>Last item</gl-deprecated-dropdown-item>
      </gl-deprecated-dropdown>`,
    mounted() {
      this.$nextTick(() => this.$el.querySelector('.dropdown-toggle').click());
    },
  }));
