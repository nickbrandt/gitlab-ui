<script>
import GlNewButton from '../../base/new_button/new_button.vue';

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
    GlNewButton,
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
    compact: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: () => ({
    titleBreaks: false,
    descriptionBreaks: false,
  }),
  computed: {
    fullscreen() {
      return !this.compact;
    },
    centerTitle() {
      return !this.compact && !this.titleBreaks;
    },
    centerDescription() {
      return this.centerTitle && !this.descriptionBreaks;
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
  <div
    class="gl-empty-state row"
    :class="{ 'empty-state': fullscreen, fullscreen, compact: !fullscreen, centered: centerTitle }"
  >
    <div :class="fullscreen ? 'col-12' : 'col-3 d-none d-sm-block'">
      <div v-if="svgPath" class="gl-empty-state-illustration-svg-content">
        <img class="gl-empty-state-illustration" :src="svgPath" :alt="title" />
      </div>
    </div>
    <div :class="fullscreen ? 'col-12' : 'col-sm-9'">
      <div class="gl-empty-state-text-content">
        <h4 ref="title" class="gl-empty-state-title" :class="{ h5: compact }">{{ title }}</h4>
        <p
          v-if="description || $slots.description"
          ref="description"
          class="gl-empty-state-description"
          :class="{ 'gl-empty-state-description-centered': centerDescription }"
        >
          <slot name="description">
            {{ description }}
          </slot>
        </p>
        <div class="gl-empty-state-actions">
          <slot name="actions">
            <gl-new-button
              v-if="shouldRenderPrimaryButton"
              variant="success"
              :href="primaryButtonLink"
              >{{ primaryButtonText }}</gl-new-button
            >
            <gl-new-button
              v-if="shouldRenderSecondaryButton"
              variant="outline-success"
              :href="secondaryButtonLink"
              >{{ secondaryButtonText }}</gl-new-button
            >
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
