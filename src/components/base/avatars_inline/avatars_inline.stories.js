import { number, boolean, object, select, withKnobs } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { avatarsInlineSizeOptions } from '../../../utils/constants';

import readme from './avatars_inline.md';

const defaultAvatars = [
  { src: 'https://picsum.photos/id/1005/32' },
  { src: 'https://picsum.photos/id/1006/32' },
  { src: 'https://picsum.photos/id/1009/32' },
  { src: 'https://picsum.photos/id/1011/32' },
  { src: 'https://picsum.photos/id/1012/32' },
];

function generateProps(avatars = defaultAvatars) {
  const props = {
    maxVisible: {
      type: Number,
      default: number('maxVisible', 2),
    },
    collapsed: {
      type: Boolean,
      default: boolean('collapsed', true),
    },
    size: {
      type: Number,
      default: select('size', avatarsInlineSizeOptions, 24),
    },
    avatars: {
      type: Array,
      default: object('avatars', avatars),
    },
  };

  return props;
}

documentedStoriesOf('base|avatar/avatars-inline', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    template: `
    <gl-avatars-inline :avatars="avatars" :collapsed="collapsed" :avatar-size="size" :max-visible="maxVisible">
    </gl-avatars-inline>
    `,
  }))
  .add('with links and tooltips', () => ({
    props: generateProps(
      defaultAvatars.map((avatar, index) => ({
        ...avatar,
        href: '//gitlab.com',
        tooltip: `Avatar ${index}`,
      }))
    ),
    template: `
    <gl-avatars-inline :avatars="avatars" :collapsed="collapsed" :avatar-size="size" :max-visible="maxVisible">
      <template #avatar="{ avatar }">
        <gl-avatar-link target="blank" :href="avatar.href" v-gl-tooltip :title="avatar.tooltip">
          <gl-avatar :src="avatar.src" :size="size" />
        </gl-avatar-link>
      </template>
    </gl-avatars-inline>
    `,
  }));
