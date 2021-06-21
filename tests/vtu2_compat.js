module.exports = () => {
  // requiring VTU is not side-effect free3, so defer it to real installation
  // eslint-disable-next-line global-require
  const VTU = require('@vue/test-utils-vue3');

  // destroy was renamed to unmount
  VTU.VueWrapper.prototype.destroy = VTU.VueWrapper.prototype.unmount;
};
