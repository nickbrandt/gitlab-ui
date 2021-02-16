const sassTrue = require('sass-true');
const fs = require('fs');
const path = require('path');

const testFiles = fs
  .readdirSync(__dirname)
  .filter((file) => file.endsWith('.spec.scss'))
  .map((file) => path.resolve(__dirname, file));

testFiles.forEach((file) => {
  sassTrue.runSass(
    { file },
    {
      describe,
      it,
    }
  );
});
