/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const scssDir = path.join(__dirname, '..', 'scss');
const mixinsPath = path.join(scssDir, 'utility-mixins.scss');
const utilitiesPath = path.join(scssDir, 'utilities.scss');

function writeUtilities(contents) {
  try {
    fs.writeFileSync(utilitiesPath, contents);
    console.log(`Successfully wrote utilities to ${utilitiesPath}`);
  } catch (e) {
    console.error(`Could not write ${utilitiesPath}`);
    throw e;
  }
}

function main() {
  try {
    const contents = fs.readFileSync(mixinsPath, { encoding: 'utf-8' });
    const mixinRegexp = new RegExp('@mixin ([^ {]+) ?{', 'g');
    const mixins = contents.match(mixinRegexp);
    writeUtilities(
      mixins.reduce((acc, mixinMatch) => {
        const mixinName = mixinMatch.replace(mixinRegexp, '$1');
        return `${acc}.${mixinName} {\n  @include ${mixinName};\n}\n`;
      }, '')
    );
  } catch (e) {
    console.error(`Could not read ${mixinsPath}`);
    throw e;
  }
}

main();
