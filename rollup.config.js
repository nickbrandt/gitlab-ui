import vue from 'rollup-plugin-vue';
import resolve from 'rollup-plugin-node-resolve';
import css from 'rollup-plugin-css-porter';
import glob from 'glob';

export default glob
  .sync('+(components|directives)/**/*.+(js|vue)')
  .concat('index.js')
  .map((input) => {
    const outputFilename = input
      .replace(/\.(vue|js)$/, '');

    return {
      input,
      output: {
        format: 'esm',
        file: `dist/${outputFilename}.js`
      },
      plugins: [
        vue(),
        css({ dest: 'dist/gitlab_ui.css' }),
        resolve(),
      ]
    };
  });
