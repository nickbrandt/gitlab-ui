import { withKnobs } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './filtered_search.md';
import {
  GlFilteredSearch,
  GlFilteredSearchBinaryToken,
  GlFilteredSearchSuggestion,
  GlDropdownDivider,
  GlLoadingIcon,
  GlAvatar,
} from '../../../../index';

const staticToken = {
  components: {
    GlFilteredSearchBinaryToken,
    GlFilteredSearchSuggestion,
  },
  props: ['value', 'active'],
  template: `
    <gl-filtered-search-binary-token
      title="Confidential"
      :active="active"
      :value="value"
      v-on="$listeners"
    >
      <template #suggestions>
        <gl-filtered-search-suggestion value="Yes"><gl-icon name="eye-slash" :size="16"/> Yes</gl-filtered-search-suggestion>
        <gl-filtered-search-suggestion value="No"><gl-icon name="eye" :size="16"/> No</gl-filtered-search-suggestion>
      </template>
    </gl-filtered-search-binary-token>
  `,
};

const dynamicToken = {
  components: {
    GlFilteredSearchBinaryToken,
    GlFilteredSearchSuggestion,
    GlDropdownDivider,
    GlLoadingIcon,
    GlAvatar,
  },
  props: ['value', 'active'],
  data() {
    return {
      loadingView: false,
      loadingSuggestions: false,
      suggestions: [],
    };
  },
  methods: {
    loadView() {
      this.loadingView = true;
      setTimeout(() => {
        this.loadingView = false;
      }, 1000);
    },
    loadSuggestions() {
      this.loadingSuggestions = true;
      setTimeout(() => {
        this.loadingSuggestions = false;
        const length = Math.ceil(Math.random() * 5);
        this.suggestions = Array.from({ length }).map((_, idx) => `Random_${idx}/${length}`);
      }, 2000);
    },
  },
  watch: {
    value(newValue) {
      if (newValue.length) {
        this.loadSuggestions();
      }
    },
    active(newValue) {
      if (!newValue) {
        this.loadView();
      }
    },
  },
  template: `
    <gl-filtered-search-binary-token
      title="Dynamic"
      :active="active"
      :value="value"
      v-on="$listeners"
    >
      <template #view>
        <gl-loading-icon size="sm" v-if="loadingView" class="gl-mr-2" />
        <gl-avatar :size="16" :entity-name="value" shape="circle" class="gl-mr-2" v-else />
        {{ value }}
      </template>
      <template #suggestions>
        <template v-if="loadingSuggestions">
          <gl-loading-icon />
        </template>
        <template v-else>
        <gl-filtered-search-suggestion value="Static1">Static (type something!)</gl-filtered-search-suggestion>
        <gl-filtered-search-suggestion value="Static2">Static2</gl-filtered-search-suggestion>
        <gl-dropdown-divider v-if="suggestions.length" />
        <gl-filtered-search-suggestion :key="idx" v-for="(suggestion, idx) in suggestions" :value="suggestion">{{ suggestion }}</gl-filtered-search-suggestion>
        </template>
      </template>
    </gl-filtered-search-binary-token>
  `,
};

const testTokens = [
  { type: 'static', icon: 'label', hint: 'static:token', token: staticToken },
  { type: 'dynamic', icon: 'rocket', hint: 'dynamic:~token', token: dynamicToken },
];

const components = {
  GlFilteredSearch,
};

documentedStoriesOf('base|filtered-search', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    data() {
      return {
        tokens: testTokens,
        value: [
          { type: 'static', value: 'static' },
          'other term',
          { type: 'dynamic', value: 'dynamic' },
        ],
      };
    },
    components,
    computed: {
      formattedValue() {
        return JSON.stringify(this.value);
      },
    },
    template: `
      <div>
        <pre>{{ formattedValue }}</pre>
        <gl-filtered-search :available-tokens="tokens" v-model="value" />
      </div>
    `,
  }));
