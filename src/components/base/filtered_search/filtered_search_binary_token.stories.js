import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import Vue from 'vue';
import PortalVue from 'portal-vue';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import GlFilteredSearchBinaryToken from './filtered_search_binary_token.vue';
import GlFilteredSearchSuggestion from './filtered_search_suggestion.vue';
import readme from './filtered_search_binary_token.md';

Vue.use(PortalVue);

const noop = () => {};

documentedStoriesOf('base|filtered-search/binary-token', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components: {
      GlFilteredSearchBinaryToken,
      GlFilteredSearchSuggestion,
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
    },
    data() {
      return {
        value: { data: 'demo1' },
      };
    },
    mounted() {
      this.$nextTick(() => {
        document.activeElement.blur();
      });
    },
    template: `
      <div>
        <div> {{ value.data }} </div>
        <div class="gl-border-1 gl-border-solid gl-border-gray-400">
          <gl-filtered-search-binary-token
            v-model="value"
            class="gl-h-full"
            :title="title"
            :active="active"
          >
            <template #suggestions>
              <gl-filtered-search-suggestion value="Yes"><gl-icon name="eye-slash" :size="16"/> Yes</gl-filtered-search-suggestion>
              <gl-filtered-search-suggestion value="No"><gl-icon name="eye" :size="16"/> No</gl-filtered-search-suggestion>
            </template>
          </gl-filtered-search-binary-token>
        </div>
        <div>
          <portal-target name="portal" class="gl-relative" />
        </div>
      </div>
    `,
  }));
