/* eslint-disable no-underscore-dangle */
const M = require('module');

module.exports = (mapping) => {
  const originalResolve = M._resolveFilename;
  M._resolveFilename = function hackedResolve(...args) {
    const match = Object.keys(mapping).find((m) => args[0].startsWith(m));
    if (match) {
      return originalResolve.call(this, args[0].replace(match, mapping[match]), ...args.slice(1));
    }

    return originalResolve.call(this, ...args);
  };
};
