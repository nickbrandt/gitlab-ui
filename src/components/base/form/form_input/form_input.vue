<script>
export default {
  inheritAttrs: false,
};
</script>

<template>
  <input type="text" class="gl-form-input" v-bind="$attrs" v-on="$listeners" />
</template>
