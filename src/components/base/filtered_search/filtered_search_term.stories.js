import { withKnobs, boolean } from '@storybook/addon-knobs';
import Vue from 'vue';
import PortalVue from 'portal-vue';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import GlFilteredSearchTerm from './filtered_search_term.vue';
import readme from './filtered_search_term.md';

Vue.use(PortalVue);
const noop = () => {};

const availableTokens = [
  { type: 'demo1', icon: 'label', hint: 'demo1:token', token: {} },
  { type: 'demo2', icon: 'rocket', hint: 'demo2:~token', token: {} },
];

documentedStoriesOf('base|filtered-search/term', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components: {
      GlFilteredSearchTerm,
    },
    provide: {
      portalName: 'portal',
      alignSuggestions: noop,
    },
    props: {
      active: {
        type: Boolean,
        default: boolean('active', true),
      },
    },
    data() {
      return {
        value: { data: 'demo1' },
        availableTokens,
      };
    },
    mounted() {
      this.$nextTick(() => document.activeElement.blur());
    },
    template: `
      <div>
        <div> {{ value.data }} </div>
        <div class="gl-border-1 gl-border-solid gl-border-gray-400">
          <gl-filtered-search-term
            v-model="value"
            class="gl-h-full"
            :active="active"
            :available-tokens="availableTokens"
          />
        </div>
        <div>
          <portal-target name="portal" class="gl-relative" />
        </div>
      </div>
    `,
  }));
