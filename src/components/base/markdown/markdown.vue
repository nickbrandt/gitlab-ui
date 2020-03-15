<script>
export default {
  props: {
    markdown: {
      type: String,
      required: true,
    },
  },
};
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div class="md" v-html="markdown"></div>
</template>
