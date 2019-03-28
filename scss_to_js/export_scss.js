const fs = require('fs');
const camelCase = require('lodash/camelCase');
const scssJson = require('./scss_variables.json'); // eslint-disable-line import/no-unresolved

const jsExports = scssJson.variables.reduce((acc, { name, compiledValue }) => {
  const exportName = camelCase(name);
  acc[exportName] = `export const ${exportName} = '${compiledValue}';`;

  return acc;
}, {});
const file = Object.values(jsExports).join('\n');

fs.writeFileSync(`${__dirname}/scss_variables.js`, file);
