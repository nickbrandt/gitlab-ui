<script>
export default {
  data() {
    return {
      status: 'not-accepted',
    };
  },
};
</script>

<template>
  <gl-form-checkbox v-model="status" value="accepted" unchecked-value="not-accepted">
    Accepted or Not Accepted
  </gl-form-checkbox>
</template>
