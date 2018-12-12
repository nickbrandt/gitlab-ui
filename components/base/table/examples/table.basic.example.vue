<script>
export default {
  data() {
    return {
      tableData: [
        {
          first_name: 'John',
          last_name: 'Doe',
        },
      ],
    };
  },
};
</script>

<template>
  <gl-table :items="tableData" />
</template>
