<script>
export default {
  data: () => ({ text: 'This is some readonly text.' }),
};
</script>

<template>
  <gl-form-textarea v-model="text" readonly />
</template>
