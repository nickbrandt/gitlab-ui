<script>
import { Portal } from 'portal-vue';
import GlFilteredSearchSuggestionList from './filtered_search_suggestion_list.vue';
import GlFilteredSearchSuggestion from './filtered_search_suggestion.vue';
import FilteredSearchSuggestionControlMixin from './filtered_search_suggestion_control_mixin';
import { TERM_TOKEN_TYPE } from './filtered_search_utils';
import GlToken from '../token/token.vue';

const SEGMENT_OPERATOR = 'OPERATOR';
const SEGMENT_DATA = 'DATA';

const DEFAULT_OPERATORS = [
  { operator: '=', description: 'is', default: 'true' },
  { operator: '!=', description: 'is not' },
];

export default {
  components: {
    Portal,
    GlFilteredSearchSuggestionList,
    GlFilteredSearchSuggestion,
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
      activeSegment: this.value.data ? SEGMENT_DATA : SEGMENT_OPERATOR,
    };
  },
  computed: {
    hasSuggestions() {
      return this.$slots.suggestions || this.options;
    },

    isOperatorActive() {
      return this.active && this.activeSegment === SEGMENT_OPERATOR;
    },

    isDataActive() {
      return this.active && this.activeSegment === SEGMENT_DATA;
    },

    operatorSuggestedValue() {
      if (this.value.operator) {
        return this.findPossibleOperator(this.value.operator)?.operator;
      }

      const defaultOperator = this.operators.find(op => op.default);
      return (defaultOperator || this.operators[0])?.operator;
    },

    dataSuggestedValue() {
      if (!this.options) {
        return this.value.data;
      }

      if (this.value.data) {
        return this.findPossibleOption(this.dataValue)?.value;
      }

      const defaultOption = this.options.find(op => op.default);
      return (defaultOption || this.options[0])?.operator;
    },

    dataValue: {
      get() {
        const optionValue = this.options?.find(({ value }) => value === this.value.data);
        return optionValue?.title ?? this.value.data;
      },

      set(v) {
        const optionValue = this.options?.find(({ title }) => title === v);
        this.value.data = optionValue?.value ?? v;
      },
    },
  },

  watch: {
    value: {
      deep: true,
      handler(newValue) {
        this.$emit('input', newValue);
      },
    },
    active: {
      handler(newValue) {
        if (!newValue && !this.value.operator && this.value.data === '') {
          this.$emit('destroy');
        }
      },
    },
  },
  created() {
    this.destroyed = false;
    this.previousValue = {
      [SEGMENT_OPERATOR]: this.value.operator ?? '',
      [SEGMENT_DATA]: this.value.data ?? '',
    };

    if (!('operator' in this.value)) {
      this.$set(this.value, 'operator', '');
    }
  },

  beforeDestroy() {
    this.destroyed = true;
  },

  methods: {
    shouldHandleSpacesInData() {
      return !this.options;
    },

    findPossibleOperator(input) {
      return this.operators.find(({ operator }) => operator.startsWith(input));
    },

    findPossibleOption(input) {
      return this.options.find(({ title }) => title.startsWith(input));
    },

    handleActiveSegment(variants) {
      const variant = Object.keys(variants).find(key => key === this.activeSegment);

      if (!variant) {
        throw new Error(`No variant found for ${this.activeSegment}`);
      }
      return variants[variant]();
    },

    hasValue() {
      return this.handleActiveSegment({
        [SEGMENT_OPERATOR]: () => this.value.operator || this.dataValue,
        [SEGMENT_DATA]: () => this.dataValue,
      });
    },

    activateDataSegment() {
      this.activateSegment(SEGMENT_DATA, this.value.data);
    },

    deactivateDataSegment(event) {
      if (this.destroyed) {
        return;
      }

      if (this.options && this.dataSuggestedValue !== this.value.data) {
        this.value.data = this.previousValue[SEGMENT_DATA];
      }

      this.deactivate(event);
    },

    activateOperatorSegment() {
      this.activateSegment(SEGMENT_OPERATOR, this.value.operator);
    },

    deactivateOperatorSegment(event) {
      if (this.destroyed) {
        return;
      }

      if (this.operatorSuggestedValue !== this.value.operator) {
        this.value.operator = this.previousValue[SEGMENT_OPERATOR];
      }

      this.deactivate(event);
    },

    handleSegmentInput(event) {
      if (this.handleInput(event)) {
        return true;
      }

      if ((event.key === ' ' || event.key === 'Spacebar') && this.options) {
        this.applyCurrentSuggestion();
        event.preventDefault();
        return true;
      }

      return false;
    },

    handleOperatorSegmentInput(event) {
      if (this.handleSegmentInput(event)) {
        return;
      }

      if (event.key.length === 1) {
        const nextInput = `${this.value.operator}${event.key}`;
        const hasSuggestion = Boolean(this.findPossibleOperator(nextInput));
        if (!hasSuggestion) {
          if (this.value.operator === '' && this.value.data === '') {
            this.applyCurrentSuggestion();
          } else {
            event.preventDefault();
          }
        }
      }
    },

    handleDataSegmentInput(event) {
      if (this.handleSegmentInput(event)) {
        return;
      }

      if (event.key.length === 1 && this.options) {
        const nextInput = `${this.value.data}${event.key}`;
        const hasSuggestion = Boolean(this.findPossibleOption(nextInput));
        if (!hasSuggestion) {
          event.preventDefault();
        }
      }
    },

    activateSegment(segment, value) {
      this.previousValue[segment] = value;

      if (this.destroyed) {
        return;
      }

      this.activeSegment = segment;

      if (!this.active) {
        this.$emit('activate');
      }

      this.focusActiveInput();
    },

    destroyToken() {
      return this.handleActiveSegment({
        [SEGMENT_OPERATOR]: () => {
          this.$emit('replace', { type: TERM_TOKEN_TYPE, value: { data: this.title } });
        },
        [SEGMENT_DATA]: () => {
          this.previousValue[SEGMENT_DATA] = '';
          this.activateSegment(SEGMENT_OPERATOR);
        },
      });
    },

    applySuggestion(value) {
      this.handleActiveSegment({
        [SEGMENT_OPERATOR]: () => {
          this.previousValue[SEGMENT_OPERATOR] = value;
          this.value.operator = value;
          this.activateSegment(SEGMENT_DATA);
        },
        [SEGMENT_DATA]: () => {
          this.previousValue[SEGMENT_DATA] = value;
          this.value.data = value;
          this.$emit('complete');
        },
      });
    },

    getSuggestionsContainer() {
      return this.handleActiveSegment({
        [SEGMENT_OPERATOR]: () => this.$refs.operatorSuggestions,
        [SEGMENT_DATA]: () => this.$refs.dataSuggestions,
      });
    },

    getActiveInput() {
      return this.handleActiveSegment({
        [SEGMENT_OPERATOR]: () => this.$refs.operatorInput,
        [SEGMENT_DATA]: () => this.$refs.dataInput,
      });
    },
  },
};
</script>

<template>
  <div class="gl-filtered-search-token" :class="{ 'gl-filtered-search-token-active': active }">
    <gl-token class="gl-filtered-search-token-type" view-only @click="activateDataSegment">
      {{ title }}
    </gl-token>

    <template v-if="isOperatorActive">
      <input
        key="operatorInput"
        ref="operatorInput"
        v-model="value.operator"
        class="gl-filtered-search-token-input"
        @keydown="handleOperatorSegmentInput"
        @blur="deactivateOperatorSegment"
      />
      <portal :key="`operator-${_uid}`" :to="portalName">
        <gl-filtered-search-suggestion-list
          :key="`operator-${_uid}`"
          ref="operatorSuggestions"
          :initial-value="operatorSuggestedValue"
          @suggestion="applySuggestion"
        >
          <gl-filtered-search-suggestion
            v-for="entry in operators"
            :key="entry.operator"
            :value="entry.operator"
          >
            {{ entry.operator }}
            <span v-if="entry.description" class="gl-filtered-search-operator-description">
              {{ entry.description }}
            </span>
          </gl-filtered-search-suggestion>
        </gl-filtered-search-suggestion-list>
      </portal>
    </template>
    <gl-token
      v-else
      class="gl-filtered-search-token-operator"
      :class="{ 'gl-cursor-pointer': active }"
      view-only
      @click="activateOperatorSegment"
    >
      {{ value.operator }}
    </gl-token>

    <template v-if="value.data !== '' || isDataActive">
      <template v-if="isDataActive">
        <input
          key="dataInput"
          ref="dataInput"
          v-model="dataValue"
          class="gl-filtered-search-token-input"
          @keydown="handleDataSegmentInput"
          @blur="deactivateDataSegment"
        />
        <portal :key="`data-${_uid}`" :to="portalName">
          <gl-filtered-search-suggestion-list
            v-if="hasSuggestions"
            :key="`data-${_uid}`"
            ref="dataSuggestions"
            :initial-value="dataSuggestedValue"
            @suggestion="applySuggestion"
          >
            <slot name="suggestions">
              <template v-if="options">
                <gl-filtered-search-suggestion
                  v-for="(item, idx) in options"
                  :key="`${idx}-${item.value}`"
                  :value="item.value"
                >
                  <gl-icon
                    v-if="item.icon"
                    :name="item.icon"
                    :size="16"
                    class="gl-filtered-search-token-icon"
                  />
                  {{ item.title }}
                </gl-filtered-search-suggestion>
              </template>
            </slot>
          </gl-filtered-search-suggestion-list>
        </portal>
      </template>
      <gl-token
        v-else
        class="gl-filtered-search-token-data"
        @close="$emit('destroy')"
        @click="activateDataSegment"
      >
        <slot name="view">{{ dataValue }}</slot>
      </gl-token>
    </template>
  </div>
</template>
