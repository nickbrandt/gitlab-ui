<script>
const testTokens = [
  {
    type: 'demotoken',
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
      historyItems: [
        [{ type: 'demotoken', value: { operator: '=', data: 1 } }, 'item 1'],
        ['item 2', { type: 'demotoken', value: { operator: '=', data: 2 } }],
      ],
    };
  },
  methods: {
    isString(val) {
      return typeof val === 'string';
    },
  },
};
</script>
<template>
  <div>
    {{ value }}
    <gl-filtered-search v-model="value" :available-tokens="tokens" :history-items="historyItems">
      <template #history-item="{ historyItem }">
        <template v-for="(token, idx) in historyItem">
          <span v-if="isString(token)" :key="idx" class="gl-px-1">{{ token }}</span>
          <span v-else :key="idx" class="gl-px-1">
            <strong>{{ token.type }}</strong> {{ token.value.operator }}
            <strong>{{ token.value.data }}</strong>
          </span>
        </template>
      </template>
    </gl-filtered-search>
  </div>
</template>
