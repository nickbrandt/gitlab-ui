<script>
export default {
  // We need this because without a v-model this input will reset on every keystroke
  data: () => ({ text: "This is some text.\nIt is read only and doesn't look like an input." }),
};
</script>

<template>
  <gl-form-textarea
    v-model="text"
    plaintext
  />
</template>
