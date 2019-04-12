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
  <gl-form-select v-model="selected">
    <option value="pizza">Pizza</option>
    <option value="tacos">Tacos</option>
    <option value="pad-thai" disabled>Pad Thai</option>
  </gl-form-select>
</template>
