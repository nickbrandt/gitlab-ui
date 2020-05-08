const sass = require('node-sass');
const {
  buildIncludePaths,
  resolveGlobUrl,
  resolveUrl,
} = require('node-sass-magic-importer/dist/toolbox');
const path = require('path');
const { statSync, readFileSync, writeFileSync } = require('fs');

const GITLAB_REPOSITORY = process.argv[2] || process.env.GITLAB_REPOSITORY;

if (!GITLAB_REPOSITORY) {
  throw new Error('You should provide path to GitLab repository');
}

const INPUT_FILE = path.resolve(GITLAB_REPOSITORY, 'app/assets/stylesheets/application.scss');
const OUTPUT_FILE = process.argv[3] || path.resolve(__dirname, '../../static/gitlab/gitlab.css');

const TRANSPARENT_1X1_PNG =
  'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==)';
const VARIABLE_DEFINITION_REGEXP = /(\$[^:]+):\s+([^;]+)/;

const sassIncludePaths = [
  path.resolve(GITLAB_REPOSITORY, 'app/assets/stylesheets'),
  path.resolve(GITLAB_REPOSITORY, 'ee/app/assets/stylesheets'),
  path.resolve(GITLAB_REPOSITORY, 'ee/app/assets/stylesheets/_ee'),
  '.storybook/gitlab-css-builder/stubs',
  './node_modules',
].map(p => path.resolve(p));

const gitlabUiDefaultVars = Object.fromEntries(
  readFileSync('./src/scss/variables.scss', 'utf8')
    .split('\n')
    .filter(x => x.includes('!default'))
    .map(entry => {
      const [varName, strValue] = entry.split(':');

      const value = strValue.replace(/!default;$/, '').trim();
      return [varName, value];
    })
);

function replaceVariables(content, vars) {
  return content
    .split('\n')
    .map(line => {
      const match = VARIABLE_DEFINITION_REGEXP.exec(line);
      if (!match) {
        return line;
      }

      const [, varName, gitlabValue] = match;
      const gitlabUiValue = gitlabUiDefaultVars[varName];
      if (!gitlabUiValue || gitlabValue === gitlabUiValue) {
        return line;
      }

      return [
        `/* ${varName}: ${gitlabValue} -> ${gitlabUiValue} */`,
        `${varName}: ${gitlabUiValue};`,
      ].join('\n');
    })
    .join('\n');
}

const gitlabCSSDir = path.dirname(INPUT_FILE);
const patchedFrameworkVariables = replaceVariables(
  readFileSync(path.resolve(gitlabCSSDir, 'framework/variables.scss'), 'utf8'),
  gitlabUiDefaultVars
);

function smartImporter(url, prev) {
  const nodeSassOptions = this.options;
  const includePaths = buildIncludePaths(nodeSassOptions.includePaths, prev).filter(
    path => !path.includes('node_modules')
  );

  if (url.startsWith('@gitlab/ui')) {
    return { file: resolveUrl(url.replace('@gitlab/ui/', ''), includePaths) };
  }

  if (url === 'framework/variables') {
    return { contents: patchedFrameworkVariables };
  }

  const filePaths = resolveGlobUrl(url, includePaths);

  if (filePaths) {
    const contents = filePaths
      .filter(file => statSync(file).isFile())
      .map(x => `@import '${x}';`)
      .join(`\n`);
    return { contents };
  }

  return null;
}
sass.render(
  {
    file: INPUT_FILE,
    includePaths: sassIncludePaths,
    importer: smartImporter,
    functions: {
      'image-url($url)': function() {
        return new sass.types.String(TRANSPARENT_1X1_PNG);
      },
    },
  },
  function(err, result) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    writeFileSync(OUTPUT_FILE, result.css);
  }
);
