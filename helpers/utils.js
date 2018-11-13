const camelCase = text =>
  text.toLowerCase().replace(/-(.)/g, (match, captured) => captured.toUpperCase());

const camelCaseAttrs = obj =>
  Object.keys(obj).reduce((accumulator, attr) => {
    accumulator[camelCase(attr)] = obj[attr];
    return accumulator;
  }, {});

const isObject = value => Object.prototype.toString.call(value) === '[object Object]';

export const compileChildren = (children, compiled = {}) =>
  Array.isArray(children)
    ? children.reduce((accumulator, child) => {
        if (child.tag) {
          const attr = camelCase(child.tag);
          const existing = accumulator[attr];
          const getChildValue = () =>
            Object.assign(
              compileChildren(child.children),
              child.data && child.data.attrs ? camelCaseAttrs(child.data.attrs) : {},
            );
          if (typeof existing === 'undefined') {
            accumulator[attr] = getChildValue();
          } else if (isObject(existing)) {
            accumulator[attr] = [existing, getChildValue()];
          } else if (Array.isArray(existing)) {
            accumulator[attr].push(getChildValue());
          }
        }
        return accumulator;
      }, compiled)
    : compiled;

export function debounce(fn) {
  let requestId;

  return function debounced(...args) {
    if (requestId) {
      window.cancelAnimationFrame(requestId);
    }
    requestId = window.requestAnimationFrame(() => fn.apply(this, args));
  };
}

export function deepAssign(...objects) {
  const merged = {};
  for (let i = objects.length - 1; i >= 0; i -= 1) {
    Object.entries(objects[i]).forEach(([prop, value]) => {
      if (typeof merged[prop] === 'undefined') {
        merged[prop] = value;
      } else if (isObject(merged[prop]) && isObject(value)) {
        merged[prop] = deepAssign(value, merged[prop]);
      }
    });
  }
  return merged;
}
