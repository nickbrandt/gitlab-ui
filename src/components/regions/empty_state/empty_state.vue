<script>
import GlButton from '../../base/button/button.vue';

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
    compact: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    shouldRenderPrimaryButton() {
      return Boolean(this.primaryButtonLink && this.primaryButtonText);
    },
    shouldRenderSecondaryButton() {
      return Boolean(
        this.shouldRenderPrimaryButton && this.secondaryButtonLink && this.secondaryButtonText
      );
    },
  },
};
</script>

<template>
  <section class="row" :class="{ 'empty-state': !compact, 'text-center': !compact }">
    <div :class="compact ? 'col-3 d-none d-sm-block' : 'col-12'">
      <div v-if="svgPath" :class="{ 'svg-content': !compact }" class="svg-250">
        <img :src="svgPath" :alt="title" class="gl-max-w-full" />
      </div>
    </div>
    <div :class="compact ? 'col-sm-9' : 'col-12'">
      <div class="text-content gl-mx-auto gl-my-0" :class="{ 'gl-p-5': !compact }">
        <h1 ref="title" :class="compact ? 'h5' : 'h4'">{{ title }}</h1>
        <p v-if="description || $slots.description" ref="description">
          <slot name="description">
            {{ description }}
          </slot>
        </p>
        <div>
          <slot name="actions">
            <gl-button
              v-if="shouldRenderPrimaryButton"
              variant="success"
              :href="primaryButtonLink"
              >{{ primaryButtonText }}</gl-button
            >
            <gl-button v-if="shouldRenderSecondaryButton" :href="secondaryButtonLink">{{
              secondaryButtonText
            }}</gl-button>
          </slot>
        </div>
      </div>
    </div>
  </section>
</template>
