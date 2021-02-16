import { BVConfigPlugin } from 'bootstrap-vue';
import Vue from 'vue';
import { tooltipDelay } from './src/utils/constants';

const bFormTextGlobalConfig = {
  textVariant: 'gl-muted',
};

const tooltipGlobalConfig = {
  customClass: 'gl-tooltip',
  delay: tooltipDelay,
};

const glTooltipDelay = localStorage.getItem('gl-tooltip-delay');

if (glTooltipDelay) {
  tooltipGlobalConfig.delay = JSON.parse(glTooltipDelay);
}

const setConfigs = () => {
  Vue.use(BVConfigPlugin, {
    BFormText: bFormTextGlobalConfig,
    BTooltip: tooltipGlobalConfig,
  });
};

export default setConfigs;
