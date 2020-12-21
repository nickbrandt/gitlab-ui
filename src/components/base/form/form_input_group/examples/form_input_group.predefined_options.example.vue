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
      <gl-button variant="success">Add</gl-button>
    </template>
  </gl-form-input-group>
</template>
