<script>
import { Portal } from 'portal-vue';
import GlFilteredSearchSuggestionList from './filtered_search_suggestion_list.vue';
import FilteredSearchSuggestionControlMixin from './filtered_search_suggestion_control_mixin';
import { TERM_TOKEN_TYPE } from './filtered_search_utils';
import GlToken from '../token/token.vue';

export default {
  components: {
    Portal,
    GlFilteredSearchSuggestionList,
    GlToken,
  },
  mixins: [FilteredSearchSuggestionControlMixin],
  inheritAttrs: false,
  props: {
    title: {
      type: String,
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
  },
  methods: {
    applySuggestion(value) {
      this.$emit('input', value);
      this.$emit('complete');
    },

    destroyToken() {
      this.$emit('replace', { type: TERM_TOKEN_TYPE, value: this.title });
    },

    getSuggestionsContainer() {
      return this.$refs.suggestions;
    },

    getInputContainer() {
      return this.$refs.input;
    },
  },
};
</script>

<template>
  <div class="gl-filtered-search-binary-token" @click="$emit('activate')">
    <gl-token variant="search-type" view-only> {{ title }}</gl-token>
    <input
      v-if="active"
      ref="input"
      class="gl-filtered-search-binary-token-input"
      type="text"
      :value="value"
      @input="$emit('input', $event.target.value)"
      @keydown="handleInput"
      @blur="deactivate"
    />
    <gl-token v-else variant="search-value" @close="$emit('destroy')">
      <slot name="view">{{ value }}</slot>
    </gl-token>

    <portal v-if="active" :to="portalName">
      <gl-filtered-search-suggestion-list
        :key="_uid"
        ref="suggestions"
        @suggestion="applySuggestion"
      >
        <slot name="suggestions"></slot>
      </gl-filtered-search-suggestion-list>
    </portal>
  </div>
</template>
