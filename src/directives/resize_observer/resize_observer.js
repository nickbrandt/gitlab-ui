import isFunction from 'lodash/isFunction';
import ResizeObserver from 'resize-observer-polyfill';

// the observer instance is shared for performance reasons
// more information: https://github.com/WICG/ResizeObserver/issues/59
const observer = new ResizeObserver((entries) => {
  entries.forEach((event) => {
    event.target.glResizeHandler(event);
  });
});

const ResizeObserverDirective = {
  bind(el, { value: resizeHandler }) {
    if (!isFunction(resizeHandler)) {
      throw TypeError('directive value must be a function');
    }

    el.glResizeHandler = resizeHandler;
    observer.observe(el);
  },
  unbind(el) {
    if (el.glResizeHandler) {
      delete el.glResizeHandler;
      observer.unobserve(el);
    }
  },
};

export default ResizeObserverDirective;
