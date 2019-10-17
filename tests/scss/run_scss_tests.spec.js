import sassTrue from 'sass-true';
import path from 'path';
import fs from 'fs';

const testFiles = fs
  .readdirSync(__dirname)
  .filter(file => file.endsWith('.scss'))
  .map(file => path.resolve(__dirname, file));

testFiles.forEach(file => {
  sassTrue.runSass(
    { file },
    {
      describe,
      it,
      includePaths: [
        path.resolve(__dirname, '..', 'src', 'scss'),
        path.resolve(__dirname, '..', 'node_modules'),
      ],
    }
  );
});
