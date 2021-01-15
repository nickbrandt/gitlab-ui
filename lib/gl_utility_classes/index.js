const fs = require('fs');
const config = require('./config');
const createUtilityMixins = require('./mixins');
const createUtilityClasses = require('./classes');

function main() {
  const mixins = createUtilityMixins(config);
  const classes = createUtilityClasses(config);

  fs.writeFileSync('./utility_mixins.scss', mixins.toResult().css, { encoding: 'utf-8' });
  fs.writeFileSync('./utility_classes.scss', classes.toResult().css, { encoding: 'utf-8' });
}

main();