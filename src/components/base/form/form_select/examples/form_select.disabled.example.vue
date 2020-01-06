<script>
export default {
  data() {
    return {
      selected: 'pizza',
      options: [
        { text: 'Pizza', value: 'pizza' },
        { text: 'Tacos', value: 'tacos' },
      ],
    };
  },
};
</script>

<template>
  <gl-form-select v-model="selected" :options="options" :disabled="true" />
</template>
