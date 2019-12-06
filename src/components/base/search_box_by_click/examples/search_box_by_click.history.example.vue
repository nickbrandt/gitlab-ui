<script>
export default {
  data() {
    return {
      value: '',
      history: ['author:@admin', 'assignee:@admin milestone:%12.5', 'label:~test'],
    };
  },
};
</script>
<template>
  <gl-search-box-by-click v-model="value" :history-items="history">
    <template #history-item="{ historyItem }">
      {{ historyItem }}
    </template>
  </gl-search-box-by-click>
</template>
