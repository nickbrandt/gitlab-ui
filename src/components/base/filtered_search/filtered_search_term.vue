<script>
import GlFilteredSearchTokenSegment from './filtered_search_token_segment.vue';
import GlFilteredSearchSuggestion from './filtered_search_suggestion.vue';
import GlIcon from '../icon/icon.vue';

export default {
  components: {
    GlIcon,
    GlFilteredSearchTokenSegment,
    GlFilteredSearchSuggestion,
  },
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
      type: Object,
      required: false,
      default: () => ({ data: '' }),
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
        item.hint.toLowerCase().includes(this.value.data.toLowerCase())
      );
    },
    internalValue: {
      get() {
        return this.value.data;
      },
      set(data) {
        this.$emit('input', { data });
      },
    },
  },
};
</script>

<template>
  <div class="gl-h-auto">
    <gl-filtered-search-token-segment
      v-model="internalValue"
      :active="active"
      :class="{ 'gl-w-full': placeholder }"
      @mousedown="$emit('activate')"
      @deactivate="$emit('deactivate')"
      @complete="$emit('replace', { type: $event })"
      @backspace="$emit('destroy')"
      @split="$emit('split', $event)"
    >
      <template #suggestions>
        <gl-filtered-search-suggestion
          v-for="(item, idx) in suggestedTokens"
          :key="idx"
          :value="item.type"
        >
          <gl-icon v-if="item.icon" :name="item.icon" class="gl-filtered-search-term-icon" />{{
            item.hint
          }}
        </gl-filtered-search-suggestion>
      </template>
      <template #view>
        <input
          v-if="placeholder"
          class="gl-filtered-search-term-input"
          :placeholder="placeholder"
        />
        <template v-else>{{ value.data }}</template>
      </template>
    </gl-filtered-search-token-segment>
  </div>
</template>
