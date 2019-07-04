import Vue from 'vue';
import BVConfig from 'bootstrap-vue/src/bv-config';
import Tooltip from 'bootstrap-vue/src/directives/tooltip/tooltip';

const glTooltipDelay = localStorage.getItem('gl-tooltip-delay');
if (glTooltipDelay) {
  Vue.use(BVConfig, {
    BTooltip: { delay: JSON.parse(glTooltipDelay) },
  });
}

export default Tooltip;
