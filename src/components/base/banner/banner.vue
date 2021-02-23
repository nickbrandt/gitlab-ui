<script>
import { bannerVariants } from '../../../utils/constants';
import GlButton from '../button/button.vue';

export default {
  name: 'GlBanner',
  components: {
    GlButton,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      required: true,
    },
    buttonLink: {
      type: String,
      required: true,
    },
    svgPath: {
      type: String,
      required: false,
      default: null,
    },
    variant: {
      type: String,
      required: false,
      default: bannerVariants[0],
      validator(value) {
        return bannerVariants.includes(value);
      },
    },
  },
  computed: {
    isIntroducing() {
      return this.variant === bannerVariants[1];
    },
  },
  methods: {
    handleClose() {
      this.$emit('close');
    },
  },
};
</script>

<template>
  <section class="gl-banner" :class="{ 'gl-banner-introduction': isIntroducing }">
    <div v-if="svgPath" class="gl-banner-illustration">
      <img :src="svgPath" alt="" role="presentation" />
    </div>
    <div class="gl-banner-content">
      <h1 class="gl-banner-title">{{ title }}</h1>
      <slot></slot>
      <gl-button variant="confirm" category="primary" :href="buttonLink">{{
        buttonText
      }}</gl-button>
    </div>
    <gl-button
      :variant="isIntroducing ? 'confirm' : 'default'"
      category="tertiary"
      size="small"
      icon="close"
      aria-label="Close"
      class="gl-banner-close"
      @click="handleClose"
    />
  </section>
</template>
