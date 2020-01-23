import Vue from 'vue';
import { VBTooltip, BVConfigPlugin } from 'bootstrap-vue';

const tooltipGlobalConfig = {
  customClass: 'gl-tooltip',
};
const glTooltipDelay = localStorage.getItem('gl-tooltip-delay');

if (glTooltipDelay) {
  tooltipGlobalConfig.delay = JSON.parse(glTooltipDelay);
}

Vue.use(BVConfigPlugin, {
  BTooltip: tooltipGlobalConfig,
});

export default VBTooltip;
