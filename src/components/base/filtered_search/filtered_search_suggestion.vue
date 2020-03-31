<script>
import GlDropdownItem from '../new_dropdown/new_dropdown_item.vue';

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
  watch: {
    isActive(newValue) {
      if (newValue) {
        window.requestAnimationFrame(() => {
          this.$refs.item.$el.scrollIntoView({ block: 'nearest', inline: 'end' });
        });
      }
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
      // We use href argument for gl-dropdown-item to use <a> instead of <button>
      // due to https://bugs.webkit.org/show_bug.cgi?id=22261
      this.filteredSearchSuggestionListInstance.$emit('suggestion', this.value);
    },
  },
};
</script>

<template>
  <gl-dropdown-item
    ref="item"
    class="dropdown-item gl-filtered-search-suggestion"
    :class="{ 'gl-filtered-search-suggestion-active': isActive }"
    v-bind="$attrs"
    href="#"
    @mousedown.native.prevent="emitValue"
  >
    <slot></slot>
  </gl-dropdown-item>
</template>
