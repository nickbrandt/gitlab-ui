<script>
const testTokens = [
  {
    type: 'unique',
    title: 'Unique',
    icon: 'document',
    token: 'gl-filtered-search-token',
    operators: [{ value: '=', description: 'is', default: 'true' }],
    options: [
      { icon: 'heart', title: 'heart', value: 1 },
      { icon: 'hook', title: 'hook', value: 2 },
    ],
    unique: true,
  },
];

export default {
  data() {
    return {
      tokens: testTokens,
      value: [],
    };
  },
};
</script>
<template>
  <div>
    {{ value }}
    <gl-filtered-search v-model="value" :available-tokens="tokens" />
  </div>
</template>
