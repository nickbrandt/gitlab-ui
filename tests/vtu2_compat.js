function normalizeMountArgs(args = {}) {
  const {
    propsData: props,
    mocks,
    provide,
    directives,
    components,
    slots = {},
    scopedSlots = {},
    stubs,
    ...restArgs
  } = args;

  return {
    props,
    global: {
      stubs,
      mocks,
      provide,
      directives,
      components,
    },
    slots: {
      ...slots,
      ...scopedSlots,
    },
    ...restArgs,
  };
}

function wrapResults(results) {
  return {
    wrappers: results,
    at(i) {
      return results[i];
    },

    trigger(...params) {
      results.forEach((w) => w.trigger(...params));
    },

    exists() {
      return results.length > 0 && results.every((x) => x.exists());
    },
  };
}

module.exports = () => {
  // requiring VTU is not side-effect free, so defer it to real installation
  // eslint-disable-next-line global-require
  const VTU = require('@vue/test-utils-vue3');

  // destroy was renamed to unmount
  VTU.VueWrapper.prototype.destroy = VTU.VueWrapper.prototype.unmount;

  // location of certain options changed for mount & shallowMount
  const originalMount = VTU.mount;
  VTU.mount = function patchedMount(component, args = {}) {
    return originalMount.call(this, component, normalizeMountArgs(args));
  };

  const originalShallowMount = VTU.shallowMount;
  VTU.shallowMount = function patchedMount(component, args = {}) {
    return originalShallowMount.call(this, component, normalizeMountArgs(args));
  };

  const originalVueFindAll = VTU.VueWrapper.prototype.findAll;
  VTU.VueWrapper.prototype.findAll = function patchedVueFindAll(...args) {
    return wrapResults(originalVueFindAll.call(this, ...args));
  };

  const originalVueFindAllComponents = VTU.VueWrapper.prototype.findAllComponents;
  VTU.VueWrapper.prototype.findAllComponents = function patchedVueFindAllComponents(...args) {
    return wrapResults(originalVueFindAllComponents.call(this, ...args));
  };
};
