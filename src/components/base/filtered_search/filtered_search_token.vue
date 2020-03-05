<script>
import GlToken from '../token/token.vue';
import GlFilteredSearchTokenSegment from './filtered_search_token_segment.vue';
import { TERM_TOKEN_TYPE } from './filtered_search_utils';

const SEGMENT_OPERATOR = 'OPERATOR';
const SEGMENT_DATA = 'DATA';

const DEFAULT_OPERATORS = [
  { value: '=', description: 'is', default: 'true' },
  { value: '!=', description: 'is not' },
];

export default {
  components: {
    GlToken,
    GlFilteredSearchTokenSegment,
  },
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
    operators: {
      type: Array,
      required: false,
      default: () => DEFAULT_OPERATORS,
    },
    options: {
      required: false,
      type: Array,
      default: () => null,
    },
    value: {
      required: false,
      default: () => ({ operator: '', data: '' }),
      type: Object,
    },
  },
  data() {
    return {
      activeSegment: null,
    };
  },

  computed: {
    hasDataOrDataSegmentIsCurrentlyActive() {
      return this.value.data !== '' || this.isSegmentActive(SEGMENT_DATA);
    },
  },
  segments: {
    SEGMENT_DATA,
    SEGMENT_OPERATOR,
  },
  watch: {
    value: {
      deep: true,
      handler(newValue) {
        this.$emit('input', newValue);
      },
    },

    active: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          if (!this.activeSegment) {
            this.activateSegment(this.value.data !== '' ? SEGMENT_DATA : SEGMENT_OPERATOR);
          }
        } else if (!this.value.operator && this.value.data === '') {
          this.$emit('destroy');
        }
      },
    },
  },

  created() {
    if (!('operator' in this.value)) {
      this.$set(this.value, 'operator', '');
    }
  },

  methods: {
    activateSegment(segment) {
      this.activeSegment = segment;

      if (!this.active) {
        this.$emit('activate');
      }
    },

    isSegmentActive(segment) {
      return this.active && this.activeSegment === segment;
    },

    replaceWithTermIfEmpty() {
      if (this.value.operator === '' && this.value.data === '') {
        this.$emit('replace', { type: TERM_TOKEN_TYPE, value: { data: this.title } });
      }
    },

    handleOperatorKeydown(evt, { inputValue, suggestedValue, applySuggestion }) {
      const { key } = evt;
      if ((key === ' ' || key === 'Spacebar') && this.options) {
        applySuggestion(suggestedValue);
        return;
      }

      const potentialValue = `${inputValue}${key}`;
      if (
        key.length === 1 &&
        !this.operators.find(({ value }) => value.startsWith(potentialValue))
      ) {
        if (this.value.data === '') {
          applySuggestion(suggestedValue);
        } else {
          evt.preventDefault();
        }
      }
    },

    destroyByClose(event) {
      if (event.target.closest('.gl-token-close')) {
        event.preventDefault();
        this.$emit('destroy');
      }
    },
  },
};
</script>

<template>
  <div class="gl-filtered-search-token" :class="{ 'gl-filtered-search-token-active': active }">
    <gl-token
      class="gl-filtered-search-token-type"
      view-only
      variant="search-type"
      @click="activateSegment($options.segments.SEGMENT_DATA)"
    >
      {{ title }}
    </gl-token>
    <gl-filtered-search-token-segment
      key="operator-segment"
      v-model="value.operator"
      :active="isSegmentActive($options.segments.SEGMENT_OPERATOR)"
      :options="operators"
      :custom-input-keydown-handler="handleOperatorKeydown"
      view-only
      @mousedown="activateSegment($options.segments.SEGMENT_OPERATOR)"
      @backspace="replaceWithTermIfEmpty"
      @complete="activateSegment($options.segments.SEGMENT_DATA)"
      @deactivate="$emit('deactivate')"
    >
      <template #view="{ inputValue }">
        <gl-token
          class="gl-filtered-search-token-operator"
          variant="search-value"
          :class="{ 'gl-cursor-pointer': !isSegmentActive($options.segments.SEGMENT_OPERATOR) }"
          view-only
        >
          {{ inputValue }}
        </gl-token>
      </template>
      <template #option="{ option }">
        <div class="gl-display-flex">
          {{ option.value }}
          <span v-if="option.description" class="gl-filtered-search-token-operator-description">
            {{ option.description }}
          </span>
        </div>
      </template>
    </gl-filtered-search-token-segment>
    <gl-filtered-search-token-segment
      v-if="hasDataOrDataSegmentIsCurrentlyActive"
      key="data-segment"
      v-model="value.data"
      :active="isSegmentActive($options.segments.SEGMENT_DATA)"
      :options="options"
      option-text-field="title"
      @mousedown="activateSegment($options.segments.SEGMENT_DATA)"
      @backspace="activateSegment($options.segments.SEGMENT_OPERATOR)"
      @complete="$emit('complete')"
      @deactivate="$emit('deactivate')"
      @split="$emit('split', $event)"
    >
      <template #suggestions>
        <slot name="suggestions"></slot>
      </template>
      <template #view="{ inputValue }">
        <gl-token
          class="gl-filtered-search-token-data"
          variant="search-value"
          :class="{ 'gl-cursor-pointer': !isSegmentActive($options.segments.SEGMENT_DATA) }"
          @mousedown="destroyByClose"
        >
          <slot name="view" v-bind="{ inputValue }"> {{ inputValue }}</slot>
        </gl-token>
      </template>
    </gl-filtered-search-token-segment>
  </div>
</template>
