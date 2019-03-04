<script>
export default {
  data() {
    return {
      selected: 'one',
      options: [{ text: 'Option 2', value: 'two' }],
    };
  },
};
</script>

<template>
  <gl-form-radio-group
    v-model="selected"
    :options="options"
    :checked="selected"
  >
    <gl-form-radio value="three">
      Option 3
    </gl-form-radio>

    <template slot="first">
      <gl-form-radio value="one">
        Option 1
      </gl-form-radio>
    </template>
  </gl-form-radio-group>
</template>
