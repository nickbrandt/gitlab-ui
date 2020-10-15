<script>
export default {
  data() {
    return {
      searchTerm: '',
      tagNames: [],
    };
  },

  computed: {
    filteredTagNames() {
      return this.tagNames.filter(tagName => tagName.includes(this.searchTerm.toLowerCase()));
    },
    filteredTagNamesLength() {
      return this.filteredTagNames.length === 0;
    },
  },

  mounted() {
    const tagNames = new Set();
    const elements = document.querySelectorAll('*');
    elements.forEach(element => tagNames.add(element.tagName.toLowerCase()));
    this.tagNames = Array.from(tagNames).sort();
  },
};
</script>

<template>
  <gl-dropdown text="Select HTML tag" header-text="Header">
    <gl-search-box-by-type v-model.trim="searchTerm" />
    <gl-dropdown-item v-for="tagName in filteredTagNames" :key="tagName">
      {{ tagName }}
    </gl-dropdown-item>
    <div v-show="filteredTagNamesLength" class="text-secondary p-2">Nothing found…</div>
  </gl-dropdown>
</template>
