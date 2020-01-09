import Vue from 'vue';
import BVConfig from 'bootstrap-vue/src/bv-config';
import Tooltip from 'bootstrap-vue/src/directives/tooltip/tooltip';

const tooltipGlobalConfig = {
  customClass: 'gl-tooltip',
  delay: { show: 400 },
};
const glTooltipDelay = localStorage.getItem('gl-tooltip-delay');

if (glTooltipDelay) {
  tooltipGlobalConfig.delay = JSON.parse(glTooltipDelay);
}

Vue.use(BVConfig, {
  BTooltip: tooltipGlobalConfig,
});

export default Tooltip;
