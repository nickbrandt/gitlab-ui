/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const scssDir = path.join(__dirname, '..', 'src', 'scss');
const mixinsPath = path.join(scssDir, 'utility-mixins');
const utilitiesPath = path.join(scssDir, 'utilities.scss');

const mixinRegexp = /@mixin ([\w-]+).+ ?{/g;
const statefulUtilitiesRegexp = /\$(active|hover|visited|focus): true/;

const getStatefulFlags = mixinDeclaration =>
  [...mixinDeclaration.matchAll(statefulUtilitiesRegexp)].map(match => match[1]);

const getMixinName = mixinDeclaration => mixinDeclaration.replace(mixinRegexp, '$1');

function writeFileHeader() {
  try {
    fs.appendFileSync(utilitiesPath, '/* auto-inject-scss-lib */\n');
    console.log(`Successfully wrote header to ${utilitiesPath}`);
  } catch (e) {
    console.error(`Could not write header to ${utilitiesPath}`);
    throw e;
  }
}

function writeUtilities(contents, file) {
  try {
    fs.appendFileSync(utilitiesPath, contents);
    console.log(`Successfully wrote ${file} to ${utilitiesPath}`);
  } catch (e) {
    console.error(`Could not write ${file} to ${utilitiesPath}`);
    throw e;
  }
}

const buildUtilityClass = (selector, mixin = selector) =>
  `.${selector} {\n  @include ${mixin};\n}\n`;

const buildStatefulUtilityClass = (state, mixin) => {
  const mixinName = `gl-${state}-${mixin.replace(/^gl-/, '')}:${state}`;
  return buildUtilityClass(mixinName, mixin);
};

const buildUtilityClasses = mixinDeclaration => {
  const mixinName = getMixinName(mixinDeclaration);
  const statefulFlags = getStatefulFlags(mixinDeclaration);
  const classes = [buildUtilityClass(mixinName)];

  return statefulFlags
    .reduce((acc, flag) => [...acc, buildStatefulUtilityClass(flag, mixinName)], classes)
    .join('');
};

function main() {
  try {
    if (fs.existsSync(utilitiesPath)) {
      fs.unlinkSync(utilitiesPath);
    }

    writeFileHeader();

    fs.readdir(mixinsPath, (err, files) => {
      if (err) throw err;

      files.forEach(file => {
        const contents = fs.readFileSync(path.join(mixinsPath, file), { encoding: 'utf-8' });
        const mixins = contents.match(mixinRegexp);

        if (mixins) {
          writeUtilities(
            mixins.reduce((acc, mixinMatch) => `${acc}${buildUtilityClasses(mixinMatch)}`, ''),
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
