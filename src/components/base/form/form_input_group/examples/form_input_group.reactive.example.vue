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
        <b-input-group-text>Username</b-input-group-text>
      </template>
      <template #append>
        <gl-button variant="success">Add</gl-button>
      </template>
    </gl-form-input-group>
  </div>
</template>
