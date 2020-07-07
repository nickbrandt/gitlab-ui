<script>
export default {
  data() {
    return {
      selected: [],
      options: [
        'String option',
        { text: 'Object option', value: 'object' },
        { html: '<i>HTML</i> option', value: 'html' },
        { text: 'Disabled option', disabled: true },
      ],
    };
  },
};
</script>

<template>
  <!--
    options: [
      'String option',
      { text: 'Object option', value: 'object' },
      { html: '<i>HTML</i> option', value: 'html' },
      { text: 'Disabled option', disabled: true },
    ],
    -->
  <gl-form-checkbox-group v-model="selected" :options="options" />
</template>
