<script>
export default {
  data() {
    return {
      selected: 'one',
      options: [{ text: 'Option 1', value: 'one' }, { text: 'Option 2', value: 'two' }],
    };
  },
};
</script>

<template>
  <gl-form-radio-group
    v-model="selected"
    :options="options"
    :buttons="true"
    button-variant="primary"
    :checked="selected"
  />
</template>
