<script>
export default {
  data() {
    return {
      pageInfo: {
        hasPreviousPage: true,
        hasNextPage: true,
      },
    };
  },
  methods: {
    // Stub version of our i18n function in GitLab
    // eslint-disable-next-line no-underscore-dangle
    __(text) {
      return text;
    },
  },
};
</script>

<template>
  <gl-keyset-pagination v-bind="pageInfo" :prev-text="__('Prev')" :next-text="__('Next')" />
</template>
