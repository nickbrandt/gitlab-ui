<script>
export default {
  data() {
    return {
      value: null,
    };
  },
};
</script>
<template>
  <gl-datepicker>
    <input
      id="datepicker-custom-input-example"
      class="gl-form-input gl-datepicker-input form-control"
      name="date"
      type="text"
      aria-label="Select a date"
      placeholder="Custom placeholder"
    />
  </gl-datepicker>
</template>
