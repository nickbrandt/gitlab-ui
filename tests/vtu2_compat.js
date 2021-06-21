const Vue = require('vue');

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
    delete component.functional;
    return originalMount.call(this, component, normalizeMountArgs(args));
  };

  const originalShallowMount = VTU.shallowMount;
  VTU.shallowMount = function patchedMount(component, args = {}) {
    delete component.functional;
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

  // setValue should use old vue2 event (input) as default
  VTU.VueWrapper.prototype.setValue = function setValue(value, prop) {
    const propEvent = prop || this.vm.model?.event || 'input';
    this.vm.$emit(propEvent, value);
    return this.vm.$nextTick();
  };

  const originalEmitted = VTU.VueWrapper.prototype.emitted;

  // emitted should not include hook events
  VTU.VueWrapper.prototype.emitted = function patchedEmitted(arg) {
    const result = originalEmitted.call(this, arg);

    return arg
      ? result
      : Object.fromEntries(Object.entries(result).filter(([k]) => !k.startsWith('hook:')));
  };

  const originalVueFindComponent = VTU.VueWrapper.prototype.findComponent;
  VTU.VueWrapper.prototype.findComponent = function patchedVueFindComponent(selector) {
    if (selector?.ref && this.vm?.$refs[selector.ref] instanceof HTMLElement) {
      return new VTU.DOMWrapper(this.vm?.$refs[selector.ref]);
    }
    return originalVueFindComponent.call(this, selector);
  };
};