import { withKnobs, boolean, text, object } from '@storybook/addon-knobs';
import Vue from 'vue';
import PortalVue from 'portal-vue';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import GlFilteredSearchStaticBinaryToken from './filtered_search_static_binary_token.vue';
import readme from './filtered_search_static_binary_token.md';

Vue.use(PortalVue);

const noop = () => {};

const defaultItems = [
  { icon: 'hourglass', title: 'first', value: 'one' },
  { title: 'second-without-icon', value: 'two' },
  { icon: 'issues', title: 'third', value: 'three' },
];

documentedStoriesOf('base|filtered-search/static-binary-token', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components: {
      GlFilteredSearchStaticBinaryToken,
    },
    provide: {
      portalName: 'portal',
      alignSuggestions: noop,
    },
    props: {
      title: {
        type: String,
        default: text('title', 'Confidential'),
      },
      active: {
        type: Boolean,
        default: boolean('active', true),
      },
      items: {
        type: Array,
        default: object('items', defaultItems),
      },
    },
    data() {
      return {
        value: 'demo1',
      };
    },
    mounted() {
      this.$nextTick(() => document.activeElement.blur());
    },
    template: `
      <div>
        <div>Value: {{ value }} </div>
        <div class="gl-border-1 gl-border-solid gl-border-gray-400">
          <gl-filtered-search-static-binary-token
            v-model="value"
            class="gl-h-full"
            :active="active"
            :items="items"
          />
        </div>
        <div>
          <portal-target name="portal" class="gl-relative" />
        </div>
      </div>
    `,
  }));
