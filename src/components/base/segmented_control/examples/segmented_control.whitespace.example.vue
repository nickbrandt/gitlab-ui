<script>
export default {
  data() {
    return {
      options: [{ value: true, text: 'Show' }, { value: false, text: 'Hide' }],
      selected: true,
    };
  },
};
</script>
<template>
  <gl-form-group id="group-id" label="Whitespace" label-size="sm" label-for="select1">
    <gl-segmented-control id="select1" v-model="selected" :options="options" />
  </gl-form-group>
</template>
