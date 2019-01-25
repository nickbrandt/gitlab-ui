<script>
export default {
  data() {
    return {
      selected: 'pizza',
    };
  },
};
</script>

<template>
  <gl-form-radio-group
    id="food-radios-2"
    v-model="selected"
    name="subcomponentradio"
  >
    <gl-form-radio value="pizza" name="food-radios-2">
      Pizza
    </gl-form-radio>
    <gl-form-radio value="tacos" name="food-radios-2">
      Tacos
    </gl-form-radio>
  </gl-form-radio-group>
</template>
