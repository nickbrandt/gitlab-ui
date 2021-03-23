import { withKnobs, object, select } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { glThemes } from '../../../utils/constants';
import items from './examples/data';
import readme from './path.md';

function generateProps() {
  return {
    theme: {
      default: select('Theme', glThemes, 'indigo'),
    },
    items: {
      default: object('Items', items),
    },
  };
}

documentedStoriesOf('base/path', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    template: `<gl-path :items="items" :theme="theme"/>`,
  }))
  .add('with popovers', () => ({
    props: generateProps(),
    template: `
      <gl-path :items="items" :theme="theme">
        <template #default="{ pathItem, pathId }">
          <gl-popover triggers="hover" placement="bottom" :target="pathId">
            <template #title>
              <strong>{{ pathItem.title }}</strong>
            </template>
            {{ pathItem.metric }}
          </gl-popover>
        </template>
      </gl-path>
    `,
  }));
