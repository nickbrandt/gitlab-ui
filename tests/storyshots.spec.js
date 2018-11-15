import initStoryshots from '@storybook/addon-storyshots';
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';

const beforeScreenshot = page => {
  // Fixing the Animation by inlining, previous approach with external file was flaky for the animation
  page.addStyleTag({
    content: `
      * {
        -webkit-transition: none !important;
        -moz-transition: none !important;
        -ms-transition: none !important;
        -o-transition: none !important;
        transition: none !important;
    
        -webkit-animation: none !important;
        -moz-animation: none !important;
        -ms-animation: none !important;
        -o-animation: none !important;
        animation: none !important;
      }
    `,
  });
};

const getGotoOptions = () => ({
  waitUntil: 'networkidle0',
});

// The following is necessary because of different font rendering
const failureThreshold = process.env.CI ? 0 : 0.02;

const getMatchOptions = () => ({
  failureThreshold,
  failureThresholdType: 'percent',
});

initStoryshots({
  suite: `Image storyshots (with ${100 * failureThreshold}% threshold)`,
  test: imageSnapshot({
    storybookUrl: `file:///${__dirname}/../storybook`,
    beforeScreenshot,
    getGotoOptions,
    getMatchOptions,
  }),
});
