<script>
export default {
  data() {
    return {
      testVal: 'foo',
    };
  },
};
</script>
<template>
  <div>
    <label>
      Data outside of the component
      <gl-form-input v-model="testVal" type="text" />
    </label>
    <gl-form-input-group v-model="testVal">
      <template #prepend>
        <gl-input-group-text>Username</gl-input-group-text>
      </template>
      <template #append>
        <gl-deprecated-button variant="success">Add</gl-deprecated-button>
      </template>
    </gl-form-input-group>
  </div>
</template>
