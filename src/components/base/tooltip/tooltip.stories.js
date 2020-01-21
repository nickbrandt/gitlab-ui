import { withKnobs, select } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './tooltip.md';
import { tooltipPlacements } from '../../../utils/constants';
import { GlTooltip, GlTooltipDirective } from '../../../../index';

const directives = {
  GlTooltipDirective,
};

const components = {
  GlTooltip,
};

function makeTooltip(modifier = '') {
  return () => ({
    directives,
    template: `
      <div class="d-flex align-items-center justify-content-center p-5 m-5">
        <gl-new-button
          v-gl-tooltip-directive${modifier}
          title="some tooltip text"
        >
            Tooltip
        </gl-new-button>
      </div>
    `,
    mounted() {
      this.$nextTick(() => this.$el.querySelector('button').focus());
    },
  });
}

function generateProps({ placement = tooltipPlacements.top } = {}) {
  return {
    placement: {
      type: String,
      default: select('placement', tooltipPlacements, placement),
    },
  };
}

function generateTooltip() {
  return () => ({
    props: generateProps(),
    components,
    template: `
      <div class="d-flex align-items-center justify-content-center p-5 m-5">
        <gl-new-button id="btn1">Tooltip</gl-new-button>
        <gl-tooltip
          target="btn1"
          triggers="hover focus click"
          show
          :placement="placement"
        >
          Hello <strong>World!</strong>
        </gl-tooltip>
      </div>
    `,
  });
}

documentedStoriesOf('base|tooltip', readme)
  .addDecorator(withKnobs)
  .add('defaults to top', makeTooltip())
  .add('to the right', makeTooltip('.right'))
  .add('to the bottom', makeTooltip('.bottom'))
  .add('to the left', makeTooltip('.left'))
  .add('with HTML content', generateTooltip());
