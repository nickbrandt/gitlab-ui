<script>
export default {
  data() {
    return {
      selected: [],
      options: [
        { text: 'Pizza', value: 'pizza' },
        { text: 'Tacos', value: 'tacos' },
        { text: 'Pasta', value: 'pasta' },
      ],
    };
  },
};
</script>

<template>
  <gl-form-checkbox-group v-model="selected" :options="options" />
</template>
