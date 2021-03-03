/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const elements = [
  { name: 'bold', markdown: '**bold**' },
  { name: 'newlines', markdown: 'a\nb\n\nc' },
];

const fixturesDir = path.join(
  __dirname,
  '..',
  'src',
  'components',
  'editors',
  'rich_text_editor',
  'fixtures'
);

function writeFixtureFile(name, markdown) {
  const fixtureFile = path.join(fixturesDir, `${name}.html`);
  fs.writeFileSync(fixtureFile, markdown);
}

async function renderMarkdownViaApi(markdown) {
  // curl --header Content-Type:application/json --data '{"text":"**bold**", "gfm":true,
  // "project":"gitlab-org/gitlab"}' "https://gitlab.com/api/v4/markdown" | jq
  const result = await axios.post(
    'https://gitlab.com/api/v4/markdown',
    {
      text: markdown,
      gfm: true,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return result.data.html;
}

function unwrapApiHtml(wrappedApiHtml) {
  return wrappedApiHtml;
}

elements.forEach(async ({ name, markdown }) => {
  const wrappedApiHtml = await renderMarkdownViaApi(markdown);
  const fileContent = unwrapApiHtml(wrappedApiHtml);
  writeFixtureFile(name, fileContent);
});
