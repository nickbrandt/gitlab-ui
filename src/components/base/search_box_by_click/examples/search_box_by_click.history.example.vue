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
  <div id="tooltipcontainer">
    <gl-search-box-by-click
      v-model="value"
      :history-items="history"
      tooltip-container="#tooltipcontainer"
    >
      <template #history-item="{ historyItem }">
        {{ historyItem }}
      </template>
    </gl-search-box-by-click>
  </div>
</template>
