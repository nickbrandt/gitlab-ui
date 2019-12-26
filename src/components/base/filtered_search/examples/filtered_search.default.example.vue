<script>
const complexToken = {
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
        this.suggestions = Array.from({ length }).map((_, idx) => `Random ${idx}/${length}`);
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
  {
    type: 'static',
    icon: 'label',
    hint: 'static:token',
    token: 'gl-filtered-search-static-binary-token',
    title: 'Static',
    items: [
      { icon: 'hourglass', title: 'first', value: 'one' },
      { title: 'second-without-icon', value: 'two' },
      { icon: 'issues', title: 'third', value: 'three' },
    ],
  },
  { type: 'dynamic', icon: 'rocket', hint: 'dynamic:~token', token: complexToken },
];

export default {
  data() {
    return {
      tokens: testTokens,
      value: [
        { type: 'static', value: 'static' },
        'term other',
        { type: 'dynamic', value: 'dynamic' },
      ],
    };
  },
};
</script>
<template>
  <gl-filtered-search v-model="value" :available-tokens="tokens" />
</template>
