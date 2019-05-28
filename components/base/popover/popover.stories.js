import { withKnobs, select, text } from '@storybook/addon-knobs';
import documentedStoriesOf from '../../../utils/documented_stories';
import { popoverPlacements } from '../../../utils/constants';

const template = `
  <div>
    <gl-button id="pop-top">{{placement}}</gl-button>
    <gl-popover target="pop-top"
      triggers="hover focus"
      :title="title"
      :placement="placement"
      :content="content"
      show
      />
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
    template,
    props: generateProps(),
    computed: {
      content() {
        return `Placement ${this.placement}`;
      },
    },
  }));
