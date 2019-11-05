import sassTrue from 'sass-true';
import path from 'path';
import fs from 'fs';

const endsWithScss = file => file.endsWith('.scss');
const resolveRoot = file => path.resolve(__dirname, file);
const resolveFunctions = file => path.resolve(`${__dirname}/functions`, file);

const rootFiles = fs
  .readdirSync(__dirname)
  .filter(endsWithScss)
  .map(resolveRoot);

const functionFiles = fs
  .readdirSync(`${__dirname}/functions`)
  .filter(endsWithScss)
  .map(resolveFunctions);

const testFiles = rootFiles.concat(functionFiles);

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
