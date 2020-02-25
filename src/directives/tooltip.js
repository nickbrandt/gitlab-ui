import Vue from 'vue';
import { VBTooltip, BVConfigPlugin } from 'bootstrap-vue';
import { tooltipDelay } from '../utils/constants';

const tooltipGlobalConfig = {
  customClass: 'gl-tooltip',
  delay: tooltipDelay,
};
const glTooltipDelay = localStorage.getItem('gl-tooltip-delay');

if (glTooltipDelay) {
  tooltipGlobalConfig.delay = JSON.parse(glTooltipDelay);
}

Vue.use(BVConfigPlugin, {
  BTooltip: tooltipGlobalConfig,
});

export default VBTooltip;
