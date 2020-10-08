<script>
export default {
  data() {
    return {
      value: new Date(2020, 0, 15),
    };
  },
};
</script>
<template>
  <gl-datepicker v-model="value" show-clear-button />
</template>
