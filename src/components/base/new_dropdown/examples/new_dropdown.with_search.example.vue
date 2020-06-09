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
  <gl-new-dropdown text="Select HTML tag">
    <gl-new-dropdown-header>Header title</gl-new-dropdown-header>
    <gl-search-box-by-type v-model.trim="searchTerm" class="m-2" />
    <gl-new-dropdown-item v-for="tagName in filteredTagNames" :key="tagName">
      {{ tagName }}
    </gl-new-dropdown-item>
    <div v-show="filteredTagNamesLength" class="text-secondary p-2">Nothing found…</div>
  </gl-new-dropdown>
</template>
