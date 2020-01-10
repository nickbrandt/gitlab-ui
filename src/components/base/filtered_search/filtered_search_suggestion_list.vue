<script>
export default {
  data() {
    return {
      activeIdx: -1,
      registeredItems: [],
    };
  },
  provide() {
    return {
      filteredSearchSuggestionListInstance: this,
    };
  },
  computed: {
    activeItem() {
      return this.activeIdx > -1 && this.activeIdx < this.registeredItems.length
        ? this.registeredItems[this.activeIdx]
        : null;
    },
  },
  methods: {
    register(item) {
      this.registeredItems.push(item);
    },
    unregister(item) {
      const idx = this.registeredItems.indexOf(item);
      if (idx !== -1) {
        this.registeredItems.splice(idx, 1);
        if (idx === this.activeIdx) {
          this.activeIdx = -1;
        }
      }
    },
    nextItem() {
      if (this.activeIdx < this.registeredItems.length) {
        this.activeIdx += 1;
      }
    },
    prevItem() {
      if (this.activeIdx >= 0) {
        this.activeIdx -= 1;
      }
    },
    getValue() {
      return this.activeItem ? this.activeItem.value : null;
    },
  },
};
</script>
<template>
  <ul class="dropdown-menu gl-filtered-search-suggestion-list">
    <slot></slot>
  </ul>
</template>
