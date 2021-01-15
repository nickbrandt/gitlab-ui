import { withKnobs } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './tooltip.md';
import { GlTooltipDirective } from '../../../../index';

const directives = {
  GlTooltip: GlTooltipDirective,
};

function makeTooltip(modifier = '') {
  return () => ({
    directives,
    template: `
      <div class="d-flex align-items-center justify-content-center p-5 m-5">
        <gl-button
          v-gl-tooltip${modifier}
          title="some tooltip text"
        >
            Tooltip
        </gl-button>
      </div>
    `,
    mounted() {
      this.$nextTick(() => this.$el.querySelector('button').focus());
    },
  });
}

documentedStoriesOf('base/tooltip', readme)
  .addDecorator(withKnobs)
  .add('top (default)', makeTooltip())
  .add('right', makeTooltip('.right'))
  .add('bottom', makeTooltip('.bottom'))
  .add('left', makeTooltip('.left'));
