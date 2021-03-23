<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'First',
          metric: '14d',
        },
        {
          title: 'Second',
          metric: '2d',
        },
      ],
    };
  },
  popoverOptions: {
    placement: 'top',
  },
};
</script>

<template>
  <gl-path :items="items" :show-popover="true" :popover-options="$options.popoverOptions">
    <template #popover-title="{ item }">
      {{ item.title }}
    </template>
    <template #popover-content="{ item }"> Metric: {{ item.metric }} </template>
  </gl-path>
</template>
