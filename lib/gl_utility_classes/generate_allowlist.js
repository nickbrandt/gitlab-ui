/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const postcssScss = require('postcss-scss');

const scssDir = path.join(__dirname, '..', '..', 'src', 'scss');
const mixinsPath = path.join(scssDir, 'utility-mixins');
const allowlistPath = path.join('allow_list.json');

const mixinNames = (root) => {
  const allDeclarations = [];

  root.walkAtRules('mixin', (rule) => {
    allDeclarations.push(rule.params);
  });

  return allDeclarations;
};

async function main() {
  try {
    if (fs.existsSync(allowlistPath)) {
      fs.unlinkSync(allowlistPath);
    }

    const files = fs.readdirSync(mixinsPath);
    const allowed = await Promise.all(files.map(async (file) => {
      const scss = fs.readFileSync(path.join(mixinsPath, file), { encoding: 'utf-8' });
      const result = await postcss().process(scss, { syntax: postcssScss });

      return mixinNames(result.root);
    }));

    fs.writeFileSync(allowlistPath, JSON.stringify(allowed.flat()), { encoding: 'utf-8' });
  } catch (e) {
    console.error(`Could not read ${mixinsPath}`);
    throw e;
  }
}

main();
