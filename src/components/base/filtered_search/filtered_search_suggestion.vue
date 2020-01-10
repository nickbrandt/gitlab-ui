<script>
import GlDropdownItem from '../new_dropdown/dropdown_item.vue';

export default {
  components: {
    GlDropdownItem,
  },
  inheritAttrs: false,
  props: {
    value: {
      required: true,
      validator: () => true,
    },
  },
  inject: ['filteredSearchSuggestionListInstance'],
  computed: {
    isActive() {
      return this.filteredSearchSuggestionListInstance.activeItem === this;
    },
  },
  created() {
    this.filteredSearchSuggestionListInstance.register(this);
  },
  beforeDestroy() {
    this.filteredSearchSuggestionListInstance.unregister(this);
  },
  methods: {
    emitValue() {
      this.filteredSearchSuggestionListInstance.$emit('suggestion', this.value);
    },
  },
};
</script>

<template>
  <gl-dropdown-item
    class="dropdown-item gl-filtered-search-suggestion"
    :class="{ 'gl-filtered-search-suggestion-active': isActive }"
    v-bind="$attrs"
    v-on="$listeners"
    @click="emitValue"
  >
    <slot></slot>
  </gl-dropdown-item>
</template>
