import Vue from 'vue/dist/vue.esm';
import BootstrapVue from 'bootstrap-vue';
import path from 'path';
import fs from 'fs';

import { parseComponent } from 'vue-template-compiler';
import * as Babel from 'babel-standalone';

import puppeteer from 'puppeteer';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

import * as gitlabComponents from '../index';
import { getResetAnimationsCSS } from './test_utils';

// Helper Function to get all files recursively in a directory
function getAllExampleFiles(dir) {
  return fs.readdirSync(dir).reduce((files, file) => {
    const fullPath = path.join(dir, file);

    const isDirectory = fs.statSync(fullPath).isDirectory();
    if (isDirectory) {
      return [...files, ...getAllExampleFiles(fullPath)];
    }
    return fullPath.endsWith('.example.vue') ? [...files, fullPath] : [...files];
  }, []);
}

function getExampleNameFromPath(examplePath) {
  return path
    .basename(examplePath, '.example.vue')
    .replace(/\./gi, '-')
    .replace(/_/gi, '-');
}

const basePath = path.resolve(__dirname, '../');
const allExamples = getAllExampleFiles(path.join(basePath, 'components'));

// We need to register all bootstrap and all GL UI Components so they are available when the example is mounted
Vue.use(BootstrapVue);
Object.keys(gitlabComponents).forEach(comp => {
  if (!comp.includes('Directive')) {
    Vue.component(comp, gitlabComponents[comp]);
  }
});

// We need to do Directives for now manually
Vue.directive('gl-tooltip', gitlabComponents.GlTooltipDirective);
Vue.directive('gl-modal-directive', gitlabComponents.GlModalDirective);
// Finished initialisation

describe('Snapshots for examples', () => {
  describe('Output Snapshots', () => {
    allExamples.map(async examplePath => {
      const relativePath = examplePath.replace(basePath, '');
      const exampleName = getExampleNameFromPath(relativePath);

      it(`${exampleName} should match the snapshot`, async () => {
        const exampleContent = fs.readFileSync(examplePath, 'utf8');
        const base = {
          name: '',
          template: '<div></div>',
        };

        // The loaded component is now parsed
        const parsed = parseComponent(exampleContent);

        let compiled = {};
        if (parsed.script) {
          const { code } = Babel.transform(parsed.script.content, {
            presets: ['es2015', 'stage-2'],
          });
          compiled = eval(`const exports = {};${code}`); // eslint-disable-line no-eval
        }

        compiled.template = parsed.template.content;

        // We have now a compiled (template + script) Vue component based on the example that we can mount
        const exampleControl = Object.assign({}, base, compiled);

        const Constructor = Vue.extend(exampleControl);
        const vm = new Constructor().$mount();

        expect(vm.$el).toMatchSnapshot();
      });
    });
  });

  describe('Image Snapshots', () => {
    let browser;

    beforeAll(async () => {
      // Extending Jest
      expect.extend({ toMatchImageSnapshot });

      // Starting the browser
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
    });

    afterAll(async () => {
      // Closing down our browser
      await browser.close();
    });

    allExamples.map(async examplePath => {
      const relativePath = examplePath.replace(basePath, '');
      const exampleName = getExampleNameFromPath(relativePath);

      it(`each example should match the image snapshot ${exampleName}`, async () => {
        const exampleUrl = `file://${path.resolve(
          __dirname,
          '../'
        )}/storybook/iframe.html?selectedKind=skeleton-loading&selectedStory=default&exampleName=${exampleName}`;

        try {
          const page = await browser.newPage();
          await page.goto(exampleUrl);

          // We wait until the example Box has loaded
          await page.waitForSelector('#exampleDisplay');

          // Removes the animation
          page.addStyleTag({
            content: getResetAnimationsCSS(),
          });

          const image = await page.screenshot();

          await expect(image).toMatchImageSnapshot({
            customSnapshotIdentifier: exampleName,
          });
        } catch (e) {
          console.error('Error ', e); // eslint-disable-line no-console
        }
      });
    });
  });
});
