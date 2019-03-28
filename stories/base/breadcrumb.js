import { withKnobs, object } from '@storybook/addon-knobs/vue';
import documentedStoriesOf from '../utils/documented_stories';
import { GlBreadcrumb } from '../../index';

const components = {
  GlBreadcrumb,
};

const getProps = () => {
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
      active: true,
    },
  ];

  return {
    items: {
      type: Object,
      default: object('items', breadcrumbItems),
    },
  };
};

documentedStoriesOf('base|breadcrumb', '')
  .addDecorator(withKnobs)
  .add('default', () => ({
    components,
    props: getProps(),
    template: `
      <gl-breadcrumb
        :items="items"
      />
    `,
  }));
