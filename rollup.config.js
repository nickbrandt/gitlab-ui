import path from 'path';
import babel from 'rollup-plugin-babel';
import vue from 'rollup-plugin-vue';
import resolve from 'rollup-plugin-node-resolve';
import { string } from 'rollup-plugin-string';
import postcss from 'rollup-plugin-postcss';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import glob from 'glob';

import { dependencies as bootstrapVueDependencies } from 'bootstrap-vue/package.json';
import { dependencies, peerDependencies } from './package.json';

/*
 List of all external modules. At the moment we consider every dependency to be a external,
 except bootstrap-vue which we bundle. See:
 https://gitlab.com/gitlab-org/gitlab-ui/issues/140
 */
const externalModules = [
  '@gitlab/ui',
  '@gitlab/svgs/dist/icons.svg',
  ...Object.keys(peerDependencies),
  ...Object.keys(dependencies).filter(name => name !== 'bootstrap-vue'),
  ...Object.keys(bootstrapVueDependencies),
];

/**
 * Returns true if an import is considered an external module.
 *
 * We consider an import to be an external module, if:
 *
 *   1. The import name matches completely, e.g. import _ from 'lodash'
 *   2. The import name matches partially and is a path, e.g. import isA from 'lodash/isArray'
 */
const isExternalModule = moduleId =>
  externalModules.some(name => moduleId === name || moduleId.startsWith(`${name}/`));

export default glob
  .sync('+(components|directives)/**/!(*.stories).+(js|vue)')
  .concat('charts.js')
  .concat('index.js')
  .map(input => {
    const outputFilename = input.replace(/\.(vue|js)$/, '');

    return {
      external: isExternalModule,
      input,
      output: {
        format: 'esm',
        file: `dist/${outputFilename}.js`,
      },
      plugins: [
        replace({
          delimiters: ['/* ', ' */'],
          include: 'index.js',
          values: {
            'auto-inject-styles': "import './scss/gitlab_ui.scss';",
          },
        }),
        postcss({
          extract: true,
          minimize: true,
          sourceMap: true,
          use: [['sass', { includePaths: [path.resolve(__dirname, 'node_modules')] }]],
        }),
        string({
          include: '**/*.md',
        }),
        vue(),
        babel({
          exclude: ['node_modules/!(bootstrap-vue)/**'],
        }),
        resolve(),
        commonjs({
          namedExports: {
            echarts: ['echarts'],
          },
        }),
      ],
    };
  });
