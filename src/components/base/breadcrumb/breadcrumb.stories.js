import { withKnobs } from '@storybook/addon-knobs/vue';
import { object } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { GlBreadcrumb } from '../../../../index';
import readme from './breadcrumb.md';

const components = {
  GlBreadcrumb,
};

const generateItems = () => {
  const breadcrumbItems = [
    {
      text: 'First Item',
      href: '#',
    },
    {
      text: 'Second Item',
      href: '#',
    },
    {
      text: 'Third Item',
      href: '#',
    },
  ];

  return {
    items: {
      type: Array,
      default: object('items', breadcrumbItems),
    },
  };
};

const generateBack = () => {
  const breadcrumbBack = {
    text: 'Back',
    href: '#',
  };

  return {
    back: {
      type: Object,
      default: object('back', breadcrumbBack),
    },
  };
};

documentedStoriesOf('base|breadcrumb', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components,
    props: { ...generateItems() },
    template: `
      <gl-breadcrumb
        :items="items"
      >
        <template #avatar>
          <img class="gl-breadcrumb-avatar-tile" src="https://assets.gitlab-static.net/uploads/-/system/group/avatar/9970/logo-extra-whitespace.png?width=15" width="15" height="15" />
        </template>
        <template #separator>
          <svg viewBox="0 0 16 16">
            <path d="M9.9 8.064L5.656 3.821A1 1 0 0 1 7.07 2.407l4.95 4.95a1 1 0 0 1 0 1.414l-4.95 4.95a1 1 0 0 1-1.414-1.414l4.242-4.243z" fill-rule="evenodd"/>
          </svg> 
        </template>
      </gl-breadcrumb>
    `,
  }))
  .add('back button', () => ({
    components,
    props: {
      ...generateItems(),
      ...generateBack(),
    },
    template: `
      <gl-breadcrumb
        :items="items"
        :back="back"
      >
        <template #avatar>
          <img class="gl-breadcrumb-avatar-tile" src="https://assets.gitlab-static.net/uploads/-/system/group/avatar/9970/logo-extra-whitespace.png?width=15" width="15" height="15" />
        </template>
        <template #separator>
          <svg viewBox="0 0 16 16">
            <path d="M9.9 8.064L5.656 3.821A1 1 0 0 1 7.07 2.407l4.95 4.95a1 1 0 0 1 0 1.414l-4.95 4.95a1 1 0 0 1-1.414-1.414l4.242-4.243z" fill-rule="evenodd"/>
          </svg> 
        </template>
      </gl-breadcrumb>
    `,
  }));
