<script>
export default {
  data() {
    return {
      optionValues: [
        { name: 'Embed', value: 'https://embed.com' },
        { name: 'Share', value: 'https://share.org' },
      ],
    };
  },
};
</script>
<template>
  <!--
optionValues = [
{ name: 'Embed', value: 'https://embed.com' },
{ name: 'Share', value: 'https://share.org' },
]
-->
  <gl-form-input-group :predefined-options="optionValues">
    <template #append>
      <gl-deprecated-button variant="success">Add</gl-deprecated-button>
    </template>
  </gl-form-input-group>
</template>
