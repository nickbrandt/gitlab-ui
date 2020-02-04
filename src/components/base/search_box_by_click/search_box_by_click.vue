<script>
import { BInputGroup, BInputGroupPrepend, BInputGroupAppend } from 'bootstrap-vue';
import GlIcon from '../icon/icon.vue';
import GlButton from '../new_button/new_button.vue';
import GlDropdown from '../new_dropdown/new_dropdown.vue';
import GlDropdownItem from '../new_dropdown/new_dropdown_item.vue';
import GlDropdownDivider from '../new_dropdown/new_dropdown_divider.vue';
import GlDropdownText from '../new_dropdown/new_dropdown_text.vue';
import GlFormInput from '../form/form_input/form_input.vue';
import GlTooltip from '../../../directives/tooltip';

export default {
  components: {
    GlIcon,
    GlButton,
    GlFormInput,
    GlDropdown,
    GlDropdownText,
    GlDropdownItem,
    GlDropdownDivider,
    BInputGroup,
    BInputGroupPrepend,
    BInputGroupAppend,
  },
  directives: {
    GlTooltip,
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
      default: null,
    },
    placeholder: {
      type: String,
      required: false,
      default: 'Search',
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    recentSearchesHeader: {
      type: String,
      required: false,
      default: 'Recent searches',
    },
    clearButtonTitle: {
      type: String,
      required: false,
      default: 'Clear',
    },
    closeButtonTitle: {
      type: String,
      required: false,
      default: 'Close',
    },
    clearRecentSearchesText: {
      type: String,
      required: false,
      default: 'Clear recent searches',
    },
    noRecentSearchesText: {
      type: String,
      required: false,
      default: "You don't have any recent searches",
    },
    tooltipContainer: {
      required: false,
      default: false,
      validator: value =>
        value === false || typeof value === 'string' || value instanceof HTMLElement,
    },
  },
  data() {
    return {
      currentValue: null,
      isFocused: false,
    };
  },
  computed: {
    inputAttributes() {
      const attributes = {
        placeholder: this.placeholder,
        ...this.$attrs,
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
  watch: {
    value: {
      handler(newValue) {
        this.currentValue = newValue;
      },
      immediate: true,
    },
    currentValue(newValue) {
      this.$emit('input', newValue);
    },
  },
  methods: {
    closeHistoryDropdown() {
      this.$refs.historyDropdown.hide();
    },
    search(value) {
      this.$emit('submit', value);
    },
    selectHistoryItem(item) {
      this.currentValue = item;
      this.search(item);
      setTimeout(() => {
        document.activeElement.blur();
      });
    },
    clearInput() {
      this.currentValue = null;
      this.$refs.input.$el.focus();
    },
  },
};
</script>

<template>
  <b-input-group class="gl-search-box-by-click">
    <b-input-group-prepend v-if="historyItems" class="gl-search-box-by-click-input-group-control">
      <gl-dropdown
        v-if="historyItems"
        ref="historyDropdown"
        class="gl-search-box-by-click-history"
        menu-class="gl-search-box-by-click-menu"
        :disabled="disabled"
      >
        <template slot="button-content">
          <gl-icon name="history" class="gl-search-box-by-click-history-icon" />
          <gl-icon name="chevron-down" class="gl-search-box-by-click-history-icon-chevron" />
        </template>
        <gl-dropdown-text class="gl-search-box-by-click-history-header">
          {{ recentSearchesHeader }}
          <gl-button
            ref="closeHistory"
            v-gl-tooltip.hover="{ container: tooltipContainer }"
            :title="closeButtonTitle"
            class="gl-search-box-by-click-close-history-button"
            name="close"
            icon="close"
            @click="closeHistoryDropdown"
          />
        </gl-dropdown-text>
        <gl-dropdown-divider />
        <template v-if="historyItems.length">
          <gl-dropdown-item
            v-for="(item, idx) in historyItems"
            :key="idx"
            class="gl-search-box-by-click-history-item"
            @click="selectHistoryItem(item)"
          >
            <slot name="history-item" :historyItem="item">{{ item }}</slot>
          </gl-dropdown-item>
          <gl-dropdown-divider />
          <gl-dropdown-item ref="clearHistory" @click="$emit('clear-history')">{{
            clearRecentSearchesText
          }}</gl-dropdown-item>
        </template>
        <gl-dropdown-text v-else class="gl-search-box-by-click-history-no-searches">{{
          noRecentSearchesText
        }}</gl-dropdown-text>
      </gl-dropdown>
    </b-input-group-prepend>
    <slot name="input">
      <gl-form-input
        ref="input"
        v-model="currentValue"
        class="gl-search-box-by-click-input"
        v-bind="inputAttributes"
        :disabled="disabled"
        @focus="isFocused = true"
        @blur="isFocused = false"
        @keydown.enter="search(currentValue)"
      />
      <button
        v-if="hasValue && !disabled"
        v-gl-tooltip.hover="{ container: tooltipContainer }"
        :title="clearButtonTitle"
        class="gl-search-box-by-click-icon-button gl-search-box-by-click-clear-button"
        name="clear"
        @click="clearInput"
      >
        <gl-icon name="clear" />
      </button>
    </slot>
    <b-input-group-append class="gl-search-box-by-click-input-group-control">
      <gl-button
        ref="searchButton"
        class="gl-search-box-by-click-search-button"
        icon="search"
        :disabled="disabled"
        @click="search(currentValue)"
      />
    </b-input-group-append>
  </b-input-group>
</template>
