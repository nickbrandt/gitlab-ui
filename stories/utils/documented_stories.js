import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';

import { storiesOf } from '@storybook/vue';
import { withDocs } from 'storybook-readme';

import 'url-search-params-polyfill';

import { GlExampleExplorer, GlExampleDisplay, GlComponentDocumentation } from '../../documentation';

const withCustomPreview = withDocs({
  PreviewComponent: {
    data() {
      return {
        // Style the preview component container
        // Default container forcefully centers the preview element
        styles: {
          padding: '50px 35px',
          margin: '16px 0',
          border: '1px dashed rgb(229, 229, 229)',
        },
      };
    },
    template: '<div v-bind:style="styles"><slot></slot></div>',
  },
  // Disable default footer's dashed bottom border
  FooterComponent: {
    data() {
      return {
        componentName: null,
      };
    },
    components: {
      GlComponentDocumentation,
      GlExampleExplorer,
    },
    template: `<div v-if="componentName">
                <gl-example-explorer :componentName="componentName" /><br/>
                <gl-component-documentation :componentName="componentName" />
              </div>`,
    mounted() {
      const urlParams = new URLSearchParams(window.location.search);
      const storyName = urlParams.get('selectedKind').match(/[^/|]*$/);
      this.componentName = `Gl${upperFirst(camelCase(storyName))}`;
    },
  },
});

// Setup for test runners
const withCustomExample = withDocs({
  PreviewComponent: {
    data() {
      return {
        // Style the preview component container
        // Default container forcefully centers the preview element
        styles: {
          padding: '0',
          margin: '0',
        },
        showStory: true,
      };
    },
    template: '<div v-if="showStory" v-bind:style="styles"><slot></slot></div>',
    created() {
      const urlParams = new URLSearchParams(window.location.search);
      this.showStory = !urlParams.get('exampleName');
    },
  },
  // Disable default footer's dashed bottom border
  FooterComponent: {
    data() {
      return {
        exampleName: '',
      };
    },
    components: {
      GlExampleDisplay,
    },
    template: `<div>
                <gl-example-display :exampleName="exampleName" :showControls="false" />
              </div>`,
    created() {
      const urlParams = new URLSearchParams(window.location.search);
      this.exampleName = urlParams.get('exampleName');
    },
  },
});

function documentedStoriesOf(storyName, readme) {
  const story = storiesOf(storyName, module);

  if (process.env.NODE_ENV !== 'test') {
    story.addDecorator(withCustomPreview(readme));
  } else {
    story.addDecorator(withCustomExample(''));
  }

  return story;
}

export default documentedStoriesOf;
