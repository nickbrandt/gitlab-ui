<script>
import GlFilteredSearchBinaryToken from './filtered_search_binary_token.vue';
import GlFilteredSearchSuggestion from './filtered_search_suggestion.vue';
import GlIcon from '../icon/icon.vue';

export default {
  components: {
    GlFilteredSearchBinaryToken,
    GlFilteredSearchSuggestion,
    GlIcon,
  },
  inheritAttrs: false,
  props: {
    value: {
      required: true,
      validator: () => true,
    },
    items: {
      required: true,
      type: Array,
    },
    active: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
  computed: {
    binaryTokenValue: {
      get() {
        const currentItem = this.items.find(({ value }) => value === this.value.data);
        return { data: currentItem ? currentItem.title : this.value.data };
      },
      set(newValue) {
        const newItem = this.items.find(({ title }) => title === newValue.data);
        this.$emit('input', newItem ? { data: newItem.value } : newValue);
      },
    },
  },
};
</script>
<template>
  <gl-filtered-search-binary-token
    v-model="binaryTokenValue"
    title="Confidential"
    :active="active"
    v-on="$listeners"
  >
    <template #suggestions>
      <gl-filtered-search-suggestion
        v-for="(item, idx) in items"
        :key="`${idx}-${item.value}`"
        :value="item.value"
      >
        <gl-icon v-if="item.icon" :name="item.icon" :size="16" />
        {{ item.title }}
      </gl-filtered-search-suggestion>
    </template>
  </gl-filtered-search-binary-token>
</template>
