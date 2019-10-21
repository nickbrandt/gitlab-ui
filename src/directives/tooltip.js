import Vue from 'vue';
import BVConfig from 'bootstrap-vue/src/bv-config';
import Tooltip from 'bootstrap-vue/src/directives/tooltip/tooltip';

Vue.use(BVConfig, {
  BTooltip: { delay: { show: 400 } },
});

Vue.use(BVConfig, {
  BTooltip: tooltipGlobalConfig,
});

export default Tooltip;
