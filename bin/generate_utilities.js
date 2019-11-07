/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const scssDir = path.join(__dirname, '..', 'src', 'scss');
const mixinsPath = path.join(scssDir, 'utility-mixins');
const utilitiesPath = path.join(scssDir, 'utilities.scss');

function writeUtilities(contents, file) {
  try {
    fs.appendFileSync(utilitiesPath, contents);
    console.log(`Successfully wrote ${file} to ${utilitiesPath}`);
  } catch (e) {
    console.error(`Could not write ${file} to ${utilitiesPath}`);
    throw e;
  }
}

function main() {
  try {
    if (fs.existsSync(utilitiesPath)) {
      fs.unlinkSync(utilitiesPath);
    }
    const mixinRegexp = new RegExp('@mixin ([^ {]+) ?{', 'g');

    fs.readdir(mixinsPath, (err, files) => {
      if (err) throw err;

      files.forEach(file => {
        const contents = fs.readFileSync(path.join(mixinsPath, file), { encoding: 'utf-8' });
        const mixins = contents.match(mixinRegexp);

        if (mixins) {
          writeUtilities(
            mixins.reduce((acc, mixinMatch) => {
              const mixinName = mixinMatch.replace(mixinRegexp, '$1');
              return `${acc}.${mixinName} {\n  @include ${mixinName};\n}\n`;
            }, ''),
            file
          );
        }
      });
    });
  } catch (e) {
    console.error(`Could not read ${mixinsPath}`);
    throw e;
  }
}

main();
