import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';

import { storiesOf } from '@storybook/vue';
import { withDocs } from 'storybook-readme';

import 'url-search-params-polyfill';

import { GlExampleExplorer, GlComponentDocumentation } from '../../documentation';

import { componentValidator as isValidComponent } from '../../documentation/all_components';

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
        error: '',
      };
    },
    components: {
      GlComponentDocumentation,
      GlExampleExplorer,
    },
    template: `<div>
                {{ error }}
                <template v-if="componentName">
                  <gl-example-explorer :componentName="componentName" /><br/>
                  <gl-component-documentation :componentName="componentName" />
                </template>
              </div>`,
    mounted() {
      const urlParams = new URLSearchParams(window.location.search);
      const storySlug = urlParams.get('id').split('--')[0];
      const splitSlug = storySlug.split('-');

      let componentName;

      do {
        splitSlug.shift();
        componentName = `Gl${upperFirst(camelCase(splitSlug.join('-')))}`;
      } while (splitSlug.length > 0 && !isValidComponent(componentName));

      if (isValidComponent(componentName)) {
        this.error = '';
        this.componentName = componentName;
      } else {
        this.error = 'Could not find a matching component';
        this.componentName = false;
      }
    },
  },
});

function documentedStoriesOf(storyName, readme) {
  const story = storiesOf(storyName, module);

  if (process.env.NODE_ENV !== 'test') {
    story.addDecorator(withCustomPreview(readme));
  }

  return story;
}

export default documentedStoriesOf;
