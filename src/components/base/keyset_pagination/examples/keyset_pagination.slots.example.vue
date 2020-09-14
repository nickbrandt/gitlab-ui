<script>
export default {
  data() {
    return {
      pageInfo: {
        hasPreviousPage: true,
        hasNextPage: true,
      },
    };
  },
};
</script>

<template>
  <gl-keyset-pagination v-bind="pageInfo">
    <template #previous-button-content>
      <span style="color: hotpink" class="gl-font-weight-bold">🦄 ᎮᏒᏋᏉᎥᎧᏬᏕ</span>
    </template>
    <template #next-button-content>
      <span style="color: purple" class="gl-font-weight-bold">ᏁᏋጀᏖ 🌈</span>
    </template>
  </gl-keyset-pagination>
</template>
