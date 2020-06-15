<script>
export default {
  data() {
    return {
      selectedTokens: [],
    };
  },
};
</script>

<template>
  <gl-token-selector
    v-model="selectedTokens"
    allow-user-defined-tokens
    hide-dropdown-with-no-items
  />
</template>
