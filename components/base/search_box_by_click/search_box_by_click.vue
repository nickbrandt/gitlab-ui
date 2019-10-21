<script>
import GlIcon from '../icon/icon.vue';
import GlButton from '../button/button.vue';
import GlDropdown from '../dropdown/dropdown.vue';
import GlDropdownItem from '../dropdown/dropdown_item.vue';
import GlDropdownDivider from '../dropdown/dropdown_divider.vue';
import GlDropdownText from 'bootstrap-vue/src/components/dropdown/dropdown-text';
import GlFormInput from '../form/form_input/form_input.vue';
import GlTooltip from '../../../directives/tooltip';

const defaultItems = ['First', 'Second', 'Third', 'Fourth', 'Fifth'];

export default {
  components: {
    GlIcon,
    GlFormInput,
    GlDropdown,
    GlDropdownText,
    GlDropdownItem,
    GlDropdownDivider,
  },
  directives: {
    GlTooltip,
  },
  data() {
    return {
      currentValue: null,
      isFocused: false,
    };
  },
  props: {
    value: {
      type: String,
      required: false,
      default: '',
    },
    historyItems: {
      type: Array,
      required: false,
      default: () => defaultItems,
    },
    placeholder: {
      type: String,
      required: false,
      default: 'Search',
    },
  },
  computed: {
    inputAttributes() {
      const attributes = {
        placeholder: this.placeholder,
      };

      if (!attributes['aria-label']) {
        attributes['aria-label'] = attributes.placeholder;
      }

      return attributes;
    },
    hasValue() {
      return Boolean(this.currentValue);
    },
  },
  methods: {
    closeHistoryDropdown() {
      this.$refs.historyDropdown.hide();
    },
    search(value) {
      this.$emit('search', value);
    },
    selectHistoryItem(item) {
      this.currentValue = item;
      setTimeout(() => {
        document.activeElement.blur();
      });
    },
    clearInput() {
      this.currentValue = null;
      this.focusInput();
    },
    focusInput() {
      this.$refs.input.$el.focus();
    },
  },
  watch: {
    value: {
      handler(newValue) {
        this.currentValue = newValue;
      },
      immediate: true,
    },
    currentValue(newValue) {
      this.$emit('change', newValue);
    },
  },
};
</script>

<template>
  <div class="gl-search-box-by-click">
    <gl-dropdown class="gl-search-box-by-click-history" ref="historyDropdown">
      <template slot="button-content">
        <gl-icon name="history" class="gl-search-box-by-click-history-icon" />
        <gl-icon name="chevron-down" class="gl-search-box-by-click-history-icon-chevron" />
      </template>
      <gl-dropdown-text class="gl-search-box-by-click-dropdown-header">
        Recent searches
        <button
          v-gl-tooltip.hover
          title="Close"
          aria-hidden="true"
          class="gl-search-box-by-click-close-icon"
          name="close"
          @click="closeHistoryDropdown"
        >
          <gl-icon name="clear" />
        </button>
      </gl-dropdown-text>
      <gl-dropdown-divider />
      <gl-dropdown-item
        v-for="(item, idx) in historyItems"
        :key="idx"
        class="gl-cursor-pointer"
        @click="selectHistoryItem(item)"
      >
        <slot name="history-item"> {{ item }}</slot>
      </gl-dropdown-item>
      <gl-dropdown-divider />
      <gl-dropdown-item @click="$emit('clear-searches')">
        Clear recent searches
      </gl-dropdown-item>
    </gl-dropdown>
    <div
      :class="{
        'gl-search-box-by-click-input-wrapper': true,
        focus: isFocused,
      }"
    >
      <gl-form-input
        ref="input"
        class="gl-search-box-by-click-input"
        v-bind="inputAttributes"
        v-model="currentValue"
        @focus="isFocused = true"
        @blur="isFocused = false"
        @keydown.enter="search"
      />
      <button
        v-if="hasValue"
        v-gl-tooltip.hover
        title="Clear"
        aria-hidden="true"
        class="gl-search-box-by-click-close-icon"
        name="clear"
        @click="clearInput"
      >
        <gl-icon name="clear" />
      </button>
    </div>
    <gl-button new-style class="gl-search-box-by-click-search-button" @click="search(currentValue)">
      <gl-icon name="search" />
    </gl-button>
  </div>
</template>
