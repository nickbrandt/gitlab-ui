<script>
import { Portal } from 'portal-vue';
import GlFilteredSearchSuggestion from './filtered_search_suggestion.vue';
import GlFilteredSearchSuggestionList from './filtered_search_suggestion_list.vue';
import FilteredSearchSuggestionControlMixin from './filtered_search_suggestion_control_mixin';
import GlIcon from '../icon/icon.vue';

export default {
  components: {
    GlIcon,
    GlFilteredSearchSuggestionList,
    GlFilteredSearchSuggestion,
    Portal,
  },
  mixins: [FilteredSearchSuggestionControlMixin],
  inheritAttrs: false,
  props: {
    availableTokens: {
      type: Array,
      required: true,
    },
    active: {
      type: Boolean,
      required: false,
      default: false,
    },
    value: {
      type: String,
      required: false,
      default: '',
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
  },
  computed: {
    suggestedTokens() {
      return this.availableTokens.filter(item =>
        item.hint.toLowerCase().includes(this.value.toLowerCase())
      );
    },
  },
  methods: {
    getSuggestionsContainer() {
      return this.$refs.suggestions;
    },

    getInputContainer() {
      return this.$refs.input;
    },

    applySuggestion(type) {
      this.$emit('replace', { type });
    },
  },
};
</script>

<template>
  <div>
    <input
      v-if="active"
      ref="input"
      type="text"
      :value="value"
      class="gl-filtered-search-term-input"
      @input="$emit('input', $event.target.value)"
      @keydown="handleInput"
      @blur="deactivate"
    />
    <div v-else class="gl-filtered-search-term-value" @click="$emit('activate')">
      <input
        v-if="placeholder"
        class="gl-filtered-search-term-input gl-w-full"
        :placeholder="placeholder"
      />
      <template v-else>{{ value }}</template>
    </div>

    <portal v-if="active && suggestedTokens.length" :to="portalName">
      <gl-filtered-search-suggestion-list
        :key="_uid"
        ref="suggestions"
        @suggestion="applySuggestion"
      >
        <gl-filtered-search-suggestion
          v-for="(item, idx) in suggestedTokens"
          :key="idx"
          :value="item.type"
        >
          <gl-icon v-if="item.icon" :name="item.icon" class="gl-filtered-search-term-icon" />{{
            item.hint
          }}
        </gl-filtered-search-suggestion>
      </gl-filtered-search-suggestion-list>
    </portal>
  </div>
</template>
