<script>
export default {
  data() {
    return {
      options: [
        { value: 1, text: 'First' },
        { value: 2, text: 'Second', disabled: true },
        { value: 3, text: 'Third' },
      ],
      selected: 1,
    };
  },
};
</script>
<template>
  <gl-segmented-control v-model="selected" :options="options" />
</template>
