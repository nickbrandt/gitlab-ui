<script>
export default {
  data() {
    return {
      text:
        'Tuesday June 12th, at 14:30 UTC we will perform database maintenance that will require up to 1 minute of downtime.',
    };
  },
};
</script>

<template>
  <div>
    <gl-broadcast-message theme="indigo">{{ text }}</gl-broadcast-message>
    <gl-broadcast-message theme="light-indigo">{{ text }}</gl-broadcast-message>
    <gl-broadcast-message theme="blue">{{ text }}</gl-broadcast-message>
    <gl-broadcast-message theme="light-blue">{{ text }}</gl-broadcast-message>
    <gl-broadcast-message theme="green">{{ text }}</gl-broadcast-message>
    <gl-broadcast-message theme="light-green">{{ text }}</gl-broadcast-message>
    <gl-broadcast-message theme="red">{{ text }}</gl-broadcast-message>
    <gl-broadcast-message theme="light-red">{{ text }}</gl-broadcast-message>
    <gl-broadcast-message theme="dark">{{ text }}</gl-broadcast-message>
    <gl-broadcast-message theme="light">{{ text }}</gl-broadcast-message>
  </div>
</template>
