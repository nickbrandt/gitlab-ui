import { withKnobs, select, text } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { popoverPlacements } from '../../../utils/constants';

const wrap = content => `
<div class="gl-my-11 gl-display-flex gl-justify-content-center">
  <gl-new-button id="pop-top">{{placement}}</gl-new-button>
  ${content}
</div>
`;

function generateProps({ placement = popoverPlacements.top, title = 'Popover!' } = {}) {
  return {
    placement: {
      type: String,
      default: select('placement', popoverPlacements, placement),
    },
    title: {
      type: String,
      default: text('title', title),
    },
  };
}

documentedStoriesOf('base|popover', '')
  .addDecorator(withKnobs)
  .add('default', () => ({
    template: wrap`
      <gl-popover target="pop-top"
        triggers="hover focus"
        :title="title"
        :placement="placement"
        :content="content"
        show
      />
    `,
    props: generateProps(),
    computed: {
      content() {
        return `Placement ${this.placement}`;
      },
    },
  }))
  .add('slots', () => ({
    template: wrap`
      <gl-popover target="pop-top"
        triggers="hover focus"
        :placement="placement"
        show
      >
        <template #default>{{ content }}</template>
        <template #title>{{ title }}</template>
      </gl-popover>
    `,
    props: generateProps(),
    computed: {
      content() {
        return `Placement ${this.placement}`;
      },
    },
  }));
