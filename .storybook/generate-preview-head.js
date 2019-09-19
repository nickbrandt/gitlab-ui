const pug = require('pug');
const path = require('path');
const fs = require('fs');

const compile = pug.compileFile(path.resolve(__dirname, 'preview-head.pug'));
const isGitlabIntegrationTest = Boolean(process.env.IS_GITLAB_INTEGRATION_TEST);

fs.writeFile(
  path.resolve(__dirname, 'preview-head.html'),
  compile({
    isGitlabIntegrationTest,
  }),
  function(err) {
    if (err) {
      return console.log(err);
    }
    if (isGitlabIntegrationTest) {
      console.log("Storybook will be using GitLab's CSS");
    }
  }
);
