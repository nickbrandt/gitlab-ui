<script>
export default {
  data() {
    return {
      value: '',
    };
  },
};
</script>
<template>
  <div id="tooltipcontainer">
    <gl-search-box-by-click v-model="value" tooltip-container="#tooltipcontainer" />
  </div>
</template>
