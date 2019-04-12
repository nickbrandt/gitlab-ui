<script>
export default {
  data() {
    return {
      selected: 'pizza',
      options: [{ text: 'Pizza', value: 'pizza' }, { text: 'Tacos', value: 'tacos' }],
    };
  },
};
</script>

<template>
  <gl-form-select v-model="selected" :options="options">
    <template slot="first">
      <option :value="null" disabled>Select a dish</option>
    </template>
  </gl-form-select>
</template>
