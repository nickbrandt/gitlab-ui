<script>
export default {
  data: () => ({
    page: 2,
  }),
};
</script>

<template>
  <gl-pagination v-model="page" :per-page="10" :total-items="100">
    <template #previous="{ page, disabled }">
      <template v-if="disabled"
        >🚫</template
      >
      <template v-else
        >⏪ {{ page }}</template
      >
    </template>
    <template #next="{ page, disabled }">
      <template v-if="disabled"
        >🚫</template
      >
      <template v-else
        >{{ page }} ⏩</template
      >
    </template>
    <template #ellipsis-left
      >🔍</template
    >
    <template #ellipsis-right
      >🔎</template
    >
    <template #page-number="{ page }"
      >📄{{ page }}</template
    >
  </gl-pagination>
</template>
