<template>
  <div>
    <p>Change events are logged to the console</p>
    <gl-pagination v-model="page" :per-page="10" :total-items="100" @input="logEvent"/>
  </div>
</template>

<script>
export default {
  data: () => ({
    page: 2,
  }),
  methods: {
    logEvent(page) {
      console.log(`page changed to ${page}`); // eslint-disable-line
    },
  },
};
</script>
