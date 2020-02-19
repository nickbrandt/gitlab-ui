import { withKnobs } from '@storybook/addon-knobs/dist/deprecated';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './dropdown.md';
import { GlDropdown, GlDropdownDivider, GlDropdownHeader, GlDropdownItem } from '../../../../index';

const components = {
  GlDropdown,
  GlDropdownDivider,
  GlDropdownHeader,
  GlDropdownItem,
};

documentedStoriesOf('base|dropdown', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: {},
    components,
    template: `
      <gl-dropdown text="Some dropdown">
        <gl-dropdown-item>First item</gl-dropdown-item>
        <gl-dropdown-item>Second item</gl-dropdown-item>
        <gl-dropdown-item>Last item</gl-dropdown-item>
      </gl-dropdown>`,
    mounted() {
      this.$nextTick(() => this.$el.querySelector('.dropdown-toggle').click());
    },
  }))
  .add('with short text and wide width', () => ({
    components,
    template: `
      <gl-dropdown :style="{ width: '400px' }" text="Some dropdown">
        <gl-dropdown-item>First item</gl-dropdown-item>
      </gl-dropdown>`,
  }))
  .add('with long text and narrow width', () => ({
    components,
    template: `
      <gl-dropdown :style="{ maxWidth: '160px' }" toggle-class="gl-w-full" text="This is a dropdown with a long toggle text">
        <gl-dropdown-item>First item</gl-dropdown-item>
      </gl-dropdown>`,
  }))
  .add('with empty text', () => ({
    components,
    template: `
      <gl-dropdown :style="{ width: '400px' }" toggle-class="gl-w-full">
        <gl-dropdown-item>First item</gl-dropdown-item>
      </gl-dropdown>`,
  }))
  .add('with links', () => ({
    props: {},
    components,
    template: `
      <gl-dropdown text="Some dropdown">
        <gl-dropdown-item href="https://about.gitlab.com/">First link</gl-dropdown-item>
        <gl-dropdown-item href="https://about.gitlab.com/">Second link</gl-dropdown-item>
        <gl-dropdown-item href="https://about.gitlab.com/">Last link</gl-dropdown-item>
      </gl-dropdown>`,
    mounted() {
      this.$nextTick(() => this.$el.querySelector('.dropdown-toggle').click());
    },
  }))
  .add('with divider', () => ({
    props: {},
    components,
    template: `
      <gl-dropdown text="Some dropdown">
        <gl-dropdown-item>Above divider</gl-dropdown-item>
        <gl-dropdown-divider />
        <gl-dropdown-item>Below divider</gl-dropdown-item>
      </gl-dropdown>`,
    mounted() {
      this.$nextTick(() => this.$el.querySelector('.dropdown-toggle').click());
    },
  }))
  .add('with header', () => ({
    props: {},
    components,
    template: `
      <gl-dropdown text="Some dropdown">
        <gl-dropdown-header>First group</gl-dropdown-header>
        <gl-dropdown-item>First item</gl-dropdown-item>
        <gl-dropdown-item>Second item</gl-dropdown-item>
        <gl-dropdown-divider />
        <gl-dropdown-header>Second group</gl-dropdown-header>
        <gl-dropdown-item>Last item</gl-dropdown-item>
      </gl-dropdown>`,
    mounted() {
      this.$nextTick(() => this.$el.querySelector('.dropdown-toggle').click());
    },
  }));
