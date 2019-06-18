<script>
import GlButton from '../../base/button/button.vue';

const textBreaks = el => {
  const originalWhiteSpace = el.style.whiteSpace;
  const blockHeight = el.offsetHeight;
  el.style.whiteSpace = 'nowrap';

  const lineHeight = el.offsetHeight;
  el.style.whiteSpace = originalWhiteSpace;

  return blockHeight > lineHeight;
};

export default {
  components: {
    GlButton,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    svgPath: {
      type: String,
      required: false,
      default: null,
    },
    description: {
      type: String,
      required: false,
      default: null,
    },
    primaryButtonLink: {
      type: String,
      required: false,
      default: null,
    },
    primaryButtonText: {
      type: String,
      required: false,
      default: null,
    },
    secondaryButtonLink: {
      type: String,
      required: false,
      default: null,
    },
    secondaryButtonText: {
      type: String,
      required: false,
      default: null,
    },
  },
  data: () => ({
    titleBreaks: false,
    descriptionBreaks: false,
  }),
  computed: {
    centerTitle() {
      return !this.titleBreaks;
    },
    centerDescription() {
      return !this.descriptionBreaks && !this.titleBreaks;
    },
    shouldRenderPrimaryButton() {
      return Boolean(this.primaryButtonLink && this.primaryButtonText);
    },
    shouldRenderSecondaryButton() {
      return Boolean(
        this.shouldRenderPrimaryButton && this.secondaryButtonLink && this.secondaryButtonText
      );
    },
  },
  mounted() {
    const { title, description } = this.$refs;
    this.titleBreaks = title && textBreaks(title);
    this.descriptionBreaks = description && textBreaks(description);
  },
};
</script>

<template>
  <div class="empty-state row">
    <div class="col-12">
      <div
        v-if="svgPath"
        class="svg-content svg-250"
      >
        <img
          :src="svgPath"
          :alt="title"
        />
      </div>
      <div class="text-content">
        <h4 ref="title" :class="{center: centerTitle}">{{ title }}</h4>
        <p
          v-if="description"
          ref="description"
          :class="{center: centerDescription}"
        >{{ description }}</p>
        <div class="text-center">
          <slot name="actions">
            <gl-button
              v-if="shouldRenderPrimaryButton"
              variant="success"
              :href="primaryButtonLink"
            >{{ primaryButtonText }}</gl-button>
            <gl-button
              v-if="shouldRenderSecondaryButton"
              variant="outline-success"
              :href="secondaryButtonLink"
            >{{ secondaryButtonText }}</gl-button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
