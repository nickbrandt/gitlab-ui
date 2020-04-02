<script>
export default {
  data() {
    return {
      visible: true,
    };
  },
};
</script>

<template>
  <div>
    <gl-deprecated-button
      :aria-expanded="visible ? 'true' : 'false'"
      aria-controls="collapse-4"
      @click="visible = !visible"
    >
      {{ visible ? 'Close' : 'Open' }}
    </gl-deprecated-button>
    <gl-collapse id="collapse-4" v-model="visible" class="gl-mt-3">
      <gl-card>I should start open!</gl-card>
    </gl-collapse>
  </div>
</template>
