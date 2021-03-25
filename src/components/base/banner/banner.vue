<script>
import { bannerVariants } from '../../../utils/constants';
import GlButton from '../button/button.vue';
import GlCard from '../card/card.vue';

export default {
  name: 'GlBanner',
  components: {
    GlButton,
    GlCard,
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
  <gl-card
    class="gl-px-8 gl-py-6 gl-line-height-20"
    :class="{ 'gl-banner-introduction': isIntroducing }"
    body-class="gl-display-flex gl-p-0!"
  >
    <div v-if="svgPath" class="gl-banner-illustration">
      <img :src="svgPath" alt="" role="presentation" />
    </div>
    <div class="gl-banner-content">
      <h1 class="gl-banner-title">{{ title }}</h1>
      <slot></slot>
      <gl-button variant="confirm" category="primary" :href="buttonLink">{{
        buttonText
      }}</gl-button>
      <slot name="actions"></slot>
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
  </gl-card>
</template>
