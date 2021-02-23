<script>
const validationStates = {
  DEFAULT: 'DEFAULT',
  VALID: 'VALID',
  INVALID: 'INVALID',
  WARNING: 'WARNING',
};

export default {
  data() {
    return {
      username: '',
    };
  },
  computed: {
    state() {
      const { username } = this;
      if (username.length === 0) {
        return validationStates.DEFAULT;
      }
      if (username.length <= 10) {
        return validationStates.VALID;
      }
      if (username.length <= 15) {
        return validationStates.WARNING;
      }
      return validationStates.INVALID;
    },
  },
};
</script>
<template>
  <gl-form-group label="Username" description="Enter your username" :state="state">
    <gl-form-input v-model="username" />
    <template #valid-feedback> Great username </template>
    <template #warning-feedback> Your username is getting a bit long </template>
    <template #invalid-feedback> Your username is definitely too long </template>
  </gl-form-group>
</template>
