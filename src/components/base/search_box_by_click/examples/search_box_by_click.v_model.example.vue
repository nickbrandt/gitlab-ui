<script>
export default {
  data() {
    return {
      text: '',
    };
  },
  methods: {
    setText() {
      this.text = 'Something else';
    },
  },
};
</script>

<template>
  <div id="tooltipcontainer">
    <gl-search-box-by-click v-model="text" tooltip-container="#tooltipcontainer" />
    <gl-button class="gl-mt-4" @click="setText"
      >Click here to set text to "Something else" using v-model</gl-button
    >
  </div>
</template>
