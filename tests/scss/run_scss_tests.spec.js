import sassTrue from 'sass-true';
import path from 'path';
import glob from 'glob';

const resolvePaths = file => path.resolve(__dirname, file);
const runTests = file => {
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
};

glob
  .sync(`${__dirname}/**/*.scss`)
  .map(resolvePaths)
  .forEach(runTests);
