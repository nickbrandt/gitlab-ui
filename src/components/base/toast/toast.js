/* eslint-disable import/no-default-export */
import Toasted from '@gitlab/vue-toasted';
import iconsPath from '@gitlab/svgs/dist/icons.svg';

const DEFAULT_OPTIONS = {
  action: {
    text: null,
    icon: () => {
      const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      icon.appendChild(path);
      icon.setAttribute('class', 'gl-icon s14');
      path.setAttribute('href', `${iconsPath}#close`);
      return icon;
    },
    class: 'toast-close',
    onClick: (e, toastObject) => toastObject.goAway(0),
  },
  iconPack: 'callback',
  position: 'bottom-left',
  duration: 5000,
  singleton: true,
  className: 'gl-toast',
  keepOnHover: true,
};

/**
 * Note: This is not a typical Vue component and needs to be registered before instantiating a Vue app.
 * Once registered, the toast will be globally available throughout your app.
 *
 * See https://gitlab-org.gitlab.io/gitlab-ui/ for detailed documentation.
 */
export default {
  install(Vue) {
    /* eslint-disable no-param-reassign */
    Vue.use(Toasted, DEFAULT_OPTIONS);

    Vue.prototype.$toast = {
      show: (message, options = {}) =>
        Vue.toasted.show(`<span>${message}</span>`, this.generateOptions(options)),
    };
  },
  generateOptions(options) {
    const updatedOptions = { ...DEFAULT_OPTIONS, ...options };

    // ensures only one extra action can be added
    // ensures toasts always have a close/dismiss button
    if (options.action) {
      updatedOptions.action = [options.action, DEFAULT_OPTIONS.action];
    }

    return updatedOptions;
  },
};
