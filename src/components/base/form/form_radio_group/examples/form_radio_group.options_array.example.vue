<script>
export default {
  data() {
    return {
      selected: 'String option',
      options: [
        'String option',
        { text: 'Object option', value: 'object' },
        { html: '<i>HTML</i> option', value: 'html' },
        { text: 'Disabled option', value: 'disabledOption', disabled: true },
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
    { text: 'Disabled option', value: 'disabledOption', disabled: true },
  ],
  -->
  <gl-form-radio-group v-model="selected" :options="options" />
</template>
