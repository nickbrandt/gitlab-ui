<script>
export default {
  props: {
    errors: {
      type: Array,
      required: true,
    },
  },
};
</script>
<template>
  <div>
    <gl-table :items="errors" />
    <!-- <ul v-for="error in errors" :key="error.id" class="error-list">
      <li>
      </li>
    </ul> -->
  </div>
</template>
