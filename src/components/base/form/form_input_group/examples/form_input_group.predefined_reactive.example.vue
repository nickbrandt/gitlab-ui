<script>
export default {
  data() {
    return {
      testVal: 'foo',
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
  <div>
    <label>
      Data outside of the component
      <input v-model="testVal" type="text" class="gl-form-input" />
    </label>
    <gl-form-input-group v-model="testVal" :predefined-options="optionValues">
      <template #append>
        <gl-deprecated-button variant="success">Add</gl-deprecated-button>
      </template>
    </gl-form-input-group>
  </div>
</template>
