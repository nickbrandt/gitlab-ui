<script>
export default {
  tabs: Array(20)
    .fill(1)
    .map((_, index) => index + 1)
    .map((id) => ({
      id,
      title: `Lorem ${id}`,
      content: `(${id}) Lorem ipsum dolar sit amit...`,
    })),
};
</script>

<template>
  <gl-scrollable-tabs>
    <gl-tab v-for="tab in $options.tabs" :key="tab.id" :title="tab.title">
      {{ tab.content }}
    </gl-tab>
  </gl-scrollable-tabs>
</template>
