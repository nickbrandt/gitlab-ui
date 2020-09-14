<script>
/* eslint-disable no-alert */
export default {
  data() {
    return {
      pageInfo: {
        startCursor:
          'eyJpZCI6IjE3NTg1ODciLCJyZWxlYXNlZF9hdCI6IjIwMjAtMDgtMjAgMTQ6NDc6MDguNTQ1MjE1MDAwIFVUQyJ9',
        endCursor:
          'eyJpZCI6IjEyNjcxNzkiLCJyZWxlYXNlZF9hdCI6IjIwMjAtMDItMTkgMjE6MDA6MDUuODU5NTQ2MDAwIFVUQyJ9',
        hasPreviousPage: true,
        hasNextPage: true,
      },
    };
  },
  methods: {
    onPrev(startCursor) {
      alert(`"prev" event fired with start cursor: "${startCursor}"`);
    },
    onNext(endCursor) {
      alert(`"next" event fired with end cursor: "${endCursor}"`);
    },
  },
};
</script>

<template>
  <gl-keyset-pagination v-bind="pageInfo" @prev="onPrev($event)" @next="onNext($event)" />
</template>
