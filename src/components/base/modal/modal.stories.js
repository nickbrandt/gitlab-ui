import { withKnobs, select, number, boolean } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { variantOptionsWithNoDefault } from '../../../utils/constants';
import { GlModal, GlModalDirective, GlDeprecatedButton } from '../../../../index';
import readme from './modal.md';

const components = {
  GlModal,
  GlDeprecatedButton,
};

const directives = {
  GlModalDirective,
};

function generateTemplate({ visible = false } = {}) {
  return `
    <div>
      <gl-deprecated-button v-gl-modal-directive="'test-modal-id'" variant="info">
        Open modal
      </gl-deprecated-button>
      <gl-modal
        :header-bg-variant="headerBgVariant"
        :header-border-variant="headerBorderVariant"
        :header-text-variant="headerTextVariant"
        :body-bg-variant="bodyBgVariant"
        :body-text-variant="bodyTextVariant"
        :footer-bg-variant="footerBgVariant"
        :footer-border-variant="footerBorderVariant"
        :footer-text-variant="footerTextVariant"
        :visible="${visible}"
        :action-primary="{text: 'OK'}"
        :action-secondary="{text: 'Discard Changes'}"
        :action-cancel="{text: 'Cancel'}"
        :scrollable="scrollable"
        modal-id="test-modal-id"
        title="Example title"
        no-fade
      >
      <p v-for="n in contentParagraphs">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
      </gl-modal>
    </div>
  `;
}

function generateProps({
  variant = variantOptionsWithNoDefault.default,
  contentPagraphs = 1,
  scrollable = false,
} = {}) {
  return {
    headerBgVariant: {
      type: String,
      default: select('header bg', variantOptionsWithNoDefault, variant),
    },
    headerBorderVariant: {
      type: String,
      default: select('header border', variantOptionsWithNoDefault, variant),
    },
    headerTextVariant: {
      type: String,
      default: select('header text', variantOptionsWithNoDefault, variant),
    },
    bodyBgVariant: {
      type: String,
      default: select('body bg', variantOptionsWithNoDefault, variant),
    },
    bodyTextVariant: {
      type: String,
      default: select('body text', variantOptionsWithNoDefault, variant),
    },
    footerBgVariant: {
      type: String,
      default: select('footer bg', variantOptionsWithNoDefault, variant),
    },
    footerBorderVariant: {
      type: String,
      default: select('footer border', variantOptionsWithNoDefault, variant),
    },
    footerTextVariant: {
      type: String,
      default: select('footer text', variantOptionsWithNoDefault, variant),
    },
    contentParagraphs: {
      type: Number,
      default: number('content paragraphs', contentPagraphs),
    },
    scrollable: {
      type: Boolean,
      default: boolean('scrollable', scrollable),
    },
  };
}

documentedStoriesOf('base|modal', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    components,
    directives,
    template: generateTemplate(),
  }))
  .add('opened modal', () => ({
    props: generateProps(),
    components,
    directives,
    template: generateTemplate({ visible: true }),
  }))
  .add('with scrolling content', () => ({
    props: generateProps({ contentPagraphs: 100, scrollable: true }),
    components,
    directives,
    template: generateTemplate({
      visible: true,
    }),
  }));
