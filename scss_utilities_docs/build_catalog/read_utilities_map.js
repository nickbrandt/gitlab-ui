const path = require('path');
const sassExtract = require('sass-extract');

const pickBy = require('lodash/pickBy');

const has = require('lodash/has');

module.exports = () => {
  const processedSass = sassExtract.renderSync({
    file: path.resolve(__dirname, 'index.scss'),
  });

  const utilitiesMap = processedSass.vars.global.$utilities.value;

  return {
    getUtilitiesWithProperties(properties) {
      return pickBy(utilitiesMap, props => properties.some(propName => has(props.value, propName)));
    },
  };
};
