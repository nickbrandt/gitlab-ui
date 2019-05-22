<script>
import { GlLink, GlTooltip } from '../../../index';

export default {
  components: {
    GlLink,
    GlTooltip,
  },
  props: {
    color: {
      type: String,
      required: true,
    },
    backgroundColor: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      required: false,
      default: '',
    },
    isScoped: {
      type: Boolean,
      required: false,
      default: false,
    },
    description: {
      type: String,
      required: false,
      default: '',
    },
    scopedLabelsDocumentationLink: {
      type: String,
      required: false,
      default: '',
    },
  },
  computed: {
    cssClasses() {
      if (!this.isScoped) {
        return null;
      }

      return ['scoped-label-wrapper'];
    },
    labelStyle() {
      return {
        backgroundColor: this.backgroundColor,
        color: this.color,
      };
    },
  },
};
</script>

<template>
  <span
    class="d-inline-block position-relative"
    :class="cssClasses"
  >
    <gl-link :href="target">
      <span :ref="'labelTitleRef'" :style="labelStyle" class="badge label color-label"><slot></slot></span>
      <gl-tooltip v-if="description" :target="() => $refs.labelTitleRef" placement="top" boundary="viewport">
        <span v-if="isScoped" class="font-weight-bold scoped-label-tooltip-title d-block">Scoped label</span>
        {{ description }}
      </gl-tooltip>
    </gl-link>

    <gl-link
      v-if="isScoped"
      :href="scopedLabelsDocumentationLink"
      target="_blank"
      class="label scoped-label"
    >
      <i class="fa fa-question-circle" :style="labelStyle"></i>
    </gl-link>
  </span>
</template>
