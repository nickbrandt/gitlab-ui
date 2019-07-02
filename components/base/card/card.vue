<script>
import BCard from 'bootstrap-vue/src/components/card/card';

export default {
  components: {
    BCard,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: false,
    },
    imgSrc: {
      type: String,
      required: false,
    },
    imgAlt: {
      type: String,
      required: false,
    },
    footer: {
      type: String,
      required: false,
    },
  },
  computed: {},
};
</script>

<template>
  <b-card
    :title="title"
    :sub-title="subTitle"
    :img-src="imgSrc"
    :img-alt="imgAlt"
    :footer="footer"
  >
    <slot></slot>
  </b-card>
</template>
