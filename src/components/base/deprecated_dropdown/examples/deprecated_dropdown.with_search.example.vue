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
      return this.tagNames.filter((tagName) => tagName.includes(this.searchTerm.toLowerCase()));
    },
  },

  mounted() {
    const tagNames = new Set();
    const elements = document.querySelectorAll('*');
    elements.forEach((element) => tagNames.add(element.tagName.toLowerCase()));
    this.tagNames = Array.from(tagNames).sort();
  },

  methods: {
    getFirstItem() {
      return this.$el.querySelector('input');
    },
  },
};
</script>

<template>
  <gl-deprecated-dropdown text="Select HTML tag">
    <gl-search-box-by-type v-model.trim="searchTerm" class="m-2" />

    <gl-deprecated-dropdown-item v-for="tagName in filteredTagNames" :key="tagName">{{
      tagName
    }}</gl-deprecated-dropdown-item>

    <div v-show="filteredTagNames.length === 0" class="text-secondary p-2">Nothing found…</div>
  </gl-deprecated-dropdown>
</template>
