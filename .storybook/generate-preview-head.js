const pug = require('pug');
const path = require('path');
const fs = require('fs');

const compile = pug.compileFile(path.resolve(__dirname, 'preview-head.pug'));

fs.writeFile(path.resolve(__dirname, 'preview-head.html'), compile({}), function(err) {
  if (err) {
    return console.log(err);
  }
  console.log(`The file was saved`);
});
